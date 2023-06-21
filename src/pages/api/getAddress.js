import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import jwt from "jsonwebtoken";

const handler = async(req,res)=> {
    let email;
    if(req.cookies.jwttoken  !== undefined){
        let jwtSecretKey = process.env.JWT_KEY;
        const verified = jwt.verify(req.cookies.jwttoken, jwtSecretKey);
        if(verified){
            let j = jwt.decode(req.cookies.jwttoken)
            email = j.email
        }else{
            // Access Denied
            return res.status(401).json('error');
        }
    }else{
        res.status(404).json('jwt not found')
    }
    if(req.method=="POST"){
        // console.log(req.body.address)
        if(req.body.acction == "address"){
            let user = await User.findOneAndUpdate({
                'email':email
            },{
                address:req.body.address
            })
        }else if(req.body.acction == "mobile"){
            let user = await User.findOneAndUpdate({
                'email':email
            },{
                mobile:req.body.number
            })
        }
        res.status(200).json('sucsess')
    }
    if(req.method == "GET"){
        let user = await User.findOne({'email':email})
        if(req.query.acction == "address"){
            let address = user['address']
            res.status(200).json(address)
        }else if(req.query.acction == "account"){
            let name = user.name
            let email = user.email
            let mobile = user['mobile']
            res.status(200).json({
                "name":name,
                "email":email,
                "mobile":mobile
            })
        }
    }
}

export default connectDb(handler)