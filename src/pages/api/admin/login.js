import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"
import crypto from 'crypto'


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
    const id = req.body.id
    if(req.method == "POST"){
    if(id == undefined){
        res.status(500)
    }else{
        let isadmin = await Admin.findById(id)
        if(isadmin == null){
            res.status(404).json("not redirect")
        }else{
            res.status(200).json("redirect")
        }
    }
    }
    else if(req.method == "PATCH"){
        let admin = await Admin.findById(id)
        if(decrypt(admin.password) == req.body.pass){
            let data = {
                details:{
                    id:id,
                    name:admin.name,
                    email:admin.email,
                    mobile:admin.mobile,
                },
                permission:admin.permission
            }
            res.status(200).json(data)
        }else{
            res.status(500)
        }
    }
}

export default connectDb(handler)