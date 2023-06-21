import connectDb from "@/middleware/mongoose";
import Order from "@/models/order";

const handler = async(req,res) => {
    if(req.method == "POST"){
        let order;
        if(req.body.from !== undefined){
            order = await Order.find({})
            order = order.slice(req.body.from,req.body.from + 20)
            if(order.length < 20 ){
               res.status(503)
            }else{
                res.status(200)
            }
        }else{
            order = await Order.findById(req.body.id)
            order = [order]
        }
         res.json(order)

    }
}

export default connectDb(handler)