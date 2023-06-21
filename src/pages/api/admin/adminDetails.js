import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"
import crypto from 'crypto'

const encrypt = (pass)=>{
  const algorithm = process.env.ALGORITHM; 
  const initVector = Buffer.from(process.env.INIT_VECTOR,'hex')
  const Securitykey = Buffer.from(process.env.SECURITY_KEY,'hex')
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(pass, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

const decrypt = (pass)=>{
  const algorithm = process.env.ALGORITHM; 
  const initVector = Buffer.from(process.env.INIT_VECTOR,'hex')
  const Securitykey = Buffer.from(process.env.SECURITY_KEY,'hex')
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(pass, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData
}

const handler = async(req, res) => {
    if(req.method === "PATCH"){
        await Admin.findByIdAndUpdate(req.body.id,{
          mobile:req.body.mobile
        })
        res.status(200).json("success")
      }
      if(req.method === "POST"){
          let admin = await Admin.findById(req.body.id)
          let oldPass = admin.password
          if(decrypt(oldPass) == req.body.oldpass){
          await Admin.findByIdAndUpdate(req.body.id,{
            password:encrypt(req.body.newPass)
          })
          res.status(200).json("success")
        }else{
          res.status(500).json("wrong password")
        }
      }
}

export default connectDb(handler)