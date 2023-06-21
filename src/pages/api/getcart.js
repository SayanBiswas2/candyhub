import connectDb from "@/middleware/mongoose"
import User from "@/models/user"
import jwt from "jsonwebtoken";

const handler = async(req, res) => {
    let user;
    if(req.cookies.jwttoken  !== undefined){
        let jwtSecretKey = process.env.JWT_KEY;
        const verified = jwt.verify(req.cookies.jwttoken, jwtSecretKey);
        if(verified){
            let j = jwt.decode(req.cookies.jwttoken)
            user = await User.find({'email':j.email})
        }else{
            // Access Denied
            res.status(401).json('error');
        }
    }else{
        res.status(404).json('jwt not found')
    }
    if(req.method == "POST"){
        let currentCart = user[0].cart.currentCart;
        let letterCart = user[0].cart.letterCart;
        let name = req.body.name
        switch(req.body.action){
            case "add":
                if(currentCart[name] == undefined){
                    currentCart[name] = req.body.detail
                }else{
                    currentCart[name][2] = currentCart[name][2] + 1
                }
                break;
            case "incriment":
                currentCart[name][2] = currentCart[name][2] + 1
                break;
            case "decriment":
                currentCart[name][2] = currentCart[name][2] - 1
                break;
            case "remove":
                delete currentCart[name]
                break;
            case "letterCart":
                letterCart[name] = currentCart[name]
                delete currentCart[name]
                break;
            case "moveToCart":
                currentCart[name] = letterCart[name]
                delete letterCart[name]
                break;
        }


        user = await User.findOneAndUpdate({
            'email':user[0].email
        },{
            cart:{
                currentCart,
                letterCart
            }
        })
        res.status(200).json("sucsees")
    }
    if(req.method == "GET"){
        res.status(200)
        console.log(user[0].cart)
        res.json(user[0].cart)
    }
  }


export default connectDb(handler)