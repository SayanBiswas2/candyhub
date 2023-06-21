import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import TempUser from "@/models/tempuser";
import User from "@/models/user";
import connectDb from "@/middleware/mongoose";
import welcomeMail, { sendOtpMail } from "../emailSender/mail";

// geneareting a random 6 digit OTP
const otpGenaretor =() => {
    let otp = Math.floor(Math.random() * 999999)
    if(otp < 100000){
        otpGenaretor()
    }else{
        return otp
    }
}

let handler = async(req,res) => {
    if(req.body.type == "signup"){
        let tempuser = await TempUser.find({'email':req.body.email})
        if(req.body.otp == tempuser[0].otp){
            let user = new User({
                name:tempuser[0].name,
                email:tempuser[0].email,
                password:tempuser[0].password
            })
            await TempUser.deleteOne({'email':req.body.email})
            await user.save()

            let jwtSecretKey = process.env.JWT_KEY;
            let data = {
                name: tempuser[0].name,
                email: tempuser[0].email,
            }
            const token = await jwt.sign(data, jwtSecretKey);
            const serialized = serialize('jwttoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 365 * 24 * 60 * 60 * 1000,
            });

            welcomeMail(tempuser[0].email,tempuser[0].name)
            res.setHeader('Set-Cookie', serialized)
            res.status(200).json('success')
        }else{
            res.status(500).json('wrong otp')
        }
    }
    if(req.body.type == "signupResand"){
        await TempUser.findOneAndUpdate({'email':req.body.email},{'otp':otpGenaretor()})
        let tempuser = await TempUser.find({'email':req.body.email})
        sendOtpMail(req.body.email,tempuser[0].name,tempuser[0].otp)
        res.status(202).json('OTP verification needed')
    }
}

export default connectDb(handler)