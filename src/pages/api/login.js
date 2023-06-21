import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import crypto from 'crypto'
import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const decrypt = (pass)=>{
    const algorithm = process.env.ALGORITHM; 
    const initVector = Buffer.from(process.env.INIT_VECTOR,'hex')
    const Securitykey = Buffer.from(process.env.SECURITY_KEY,'hex')
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(pass, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData
}

const handler = async(req,res) => {
    if(req.method =="POST"){
        let user = await User.find({email:req.body.email})
        if(user.length ==0){
            res.status(404).json('user not found')
        }else{
            if(decrypt(user[0].password) == req.body.pass){
                let jwtSecretKey = process.env.JWT_KEY;
                let data = {
                    name: user[0].name,
                    email: user[0].email,
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
            }else{
                res.status(401).json("wrong Password")
            }
        }
    }else{
        res.status(400).json('Bad Request')
    }
}

export default connectDb(handler)