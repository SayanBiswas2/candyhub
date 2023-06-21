import User from "@/models/user"
import crypto from 'crypto'
import TempUser from "@/models/tempuser"
import connectDb from "@/middleware/mongoose"
import {sendOtpMail} from "../emailSender/mail"

const otpGenaretor =() => {
    let otp = Math.floor(Math.random() * 999999)
    if(otp < 100000){
        otpGenaretor()
    }else{
        return otp
    }
}

const encrypt = (pass)=>{
    const algorithm = process.env.ALGORITHM; 
    const initVector = Buffer.from(process.env.INIT_VECTOR,'hex')
    const Securitykey = Buffer.from(process.env.SECURITY_KEY,'hex')
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(pass, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

const handler = async(req, res)=> {
    if(req.method == 'POST'){
        console.log(req.body)
        let user = await User.find({'email':req.body.email})
        if(user.length == 0){
            let tempuser = await TempUser.find({'email':req.body.email})
            if(tempuser.length==0){
                let tempUser = new TempUser({
                    name:req.body.name,
                    email:req.body.email,
                    password:encrypt(req.body.pass),
                    otp:otpGenaretor()
                })
                await tempUser.save()
            }else{
                await TempUser.deleteOne({'email':req.body.email})
                let tempUser = new TempUser({
                    name:req.body.name,
                    email:req.body.email,
                    password:encrypt(req.body.pass),
                    otp:otpGenaretor()
                })
                await tempUser.save()
            }
            tempuser = await TempUser.find({'email':req.body.email})
            sendOtpMail(req.body.email,req.body.name,tempuser[0].otp)
            res.status(202).json('OTP verification needed')
        }else{
            res.status(400).json("User Allrady exist")
        }
    }else{
        console.log(process.env.MONGO_URL)
        res.status(400).json('Bad request')
    }
}

export default connectDb(handler)
  