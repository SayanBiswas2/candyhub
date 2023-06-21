import connectDb from "@/middleware/mongoose";
import Order from "@/models/order";
import jwt from "jsonwebtoken";

const handler = async(req,res) => {
    if(req.method == "POST"){
        if(req.cookies.jwttoken  !== undefined){
            let jwtSecretKey = process.env.JWT_KEY;
            const verified = jwt.verify(req.cookies.jwttoken, jwtSecretKey);
            if(verified){
                let j = jwt.decode(req.cookies.jwttoken)
                let order = new Order({
                    name: j.name,
                    userId: j.email,
                    products: req.body.product,
                    address: req.body.address,
                    amount:req.body.amount
                })
                await order.save()
                res.status(200).json("Ordered succesfully")
            }else{
                // Access Denied
                return res.status(401).json('error');
            }
        }else{
            res.status(404).json('jwt not found')
        }
    }
}


export default connectDb(handler)