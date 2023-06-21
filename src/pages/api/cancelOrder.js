import connectDb from "@/middleware/mongoose";
import Order from "@/models/order";

const handler = async(req,res) => {
    if(req.method == "POST"){
        let order = await Order.findByIdAndUpdate(req.body.id,{
            "status":"Canceled"
        })
        res.status(200).json(order)
    }
}

export default connectDb(handler)