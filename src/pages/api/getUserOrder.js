import connectDb from "@/middleware/mongoose";
import Order from "@/models/order";
import jwt from "jsonwebtoken";

const handler = async(req,res) =>{
    let email;
    if(req.cookies.jwttoken  !== undefined){
        let jwtSecretKey = process.env.JWT_KEY;
        const verified = jwt.verify(req.cookies.jwttoken, jwtSecretKey);
        if(verified){
            let j = jwt.decode(req.cookies.jwttoken)
            email =j.email;
            
        }else{
            // Access Denied
            return res.status(401).json('error');
        }
    }else{
        res.status(404).json('jwt not found')
    }

    if(req.method == "POST"){
        let order = await Order.findById(req.body.id)
        //sconsole.log(order)
        res.status(200).json(order)
        
    }
    if(req.method =="GET"){
        let orders = await Order.find({'userId':email})
        let array =[]
        orders.map((val)=>{
            let arr =[val._id,val.products[0][0],val.products[0][2],val.products.length]
            array.push(arr)
        })
        res.status(200).json(array)
    }
}

export default connectDb(handler)