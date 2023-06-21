import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"
import crypto from 'crypto'
import { welcomeAdminMail } from "../emailSender/mail"

const generatePassword = () => {
    let pass = Math.floor(Math.random() * 99999999)
    if(pass < 10000000){
        generatePassword()
    }else{
        return pass
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

const handler = async(req, res) => {
    const password = generatePassword()
    let admin = new Admin({
        name:req.body.name,
        email:req.body.email,
        password:encrypt(`${password}`),
        permission:req.body.permission
    })
    await admin.save()
    console.log(admin)
    welcomeAdminMail(req.body.email,req.body.name,password,admin._id.toString())
    res.status(200).json("success")
}

export default connectDb(handler)