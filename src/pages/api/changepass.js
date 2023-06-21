import changePass from "@/models/changePass";
import connectDb from "@/middleware/mongoose";
import { sendTokenMail } from "./emailSender/mail";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import { serialize } from 'cookie';


const encrypt = (pass)=>{
    const algorithm = process.env.ALGORITHM; 
    const initVector = Buffer.from(process.env.INIT_VECTOR,'hex')
    const Securitykey = Buffer.from(process.env.SECURITY_KEY,'hex')
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(pass, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

const handler = async(req,res) => {
    if(req.method == "POST"){
        if(req.body.action == "token"){
            let user = await User.find({'email':req.body.email})
            if(user.length == 1){
                const getToken = async() => {
                    const token = Date.now() * Math.floor(Math.random() * 100)
                    let tokenExist = await changePass.find({'token':token})
                    if(tokenExist == 0){
                        return token;
                    }else{
                        getToken()
                    }
                }
                const token = await getToken()
                if(await changePass.find({'email':req.body.email}) == 0){
                let chengePass = new changePass({
                    email:req.body.email,
                    token: token,
                })
                chengePass.save()
                }else{
                    await changePass.findOneAndUpdate({
                        'email':req.body.email
                    },{
                        'token':token
                    })
                }
                sendTokenMail(req.body.email,user[0].name,token)
                res.status(200).json('sucsees')
            }else{
                res.status(404).json('user not found')
            }
        }else if(req.body.action == "chenge"){
            let user = await changePass.find({'token':req.body.token})
            if(user.length == 1){
                user = await User.findOneAndUpdate({
                    'email':user[0].email
                },{
                    password:encrypt(req.body.pass)
                })
                await changePass.findOneAndDelete({'email':user.email})
                
                let jwtSecretKey = process.env.JWT_KEY;
                let data = {
                    name: user.name,
                    email: user.email,
                }
                const token = await jwt.sign(data, jwtSecretKey);
                const serialized = serialize('jwttoken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                });
                res.setHeader('Set-Cookie', serialized)
                res.status(200).json('success')
            }
        }
    }
    else if(req.method =="GET"){
        let token = req.query.token
        token = await changePass.find({'token':token})
        if(token.length == 1){
            res.status(200).json("sucsses")
        }else{
            res.status(404).json("not found")
        }
    }
}

export default connectDb(handler)