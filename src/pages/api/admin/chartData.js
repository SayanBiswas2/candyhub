import connectDb from "@/middleware/mongoose"
import Order from "@/models/order"


const handler = async(req, res) => {
  if(req.method == "POST"){
    let sell = []
    const date = new Date()
    for (let i = 0; i < 7; i++) {
        let order = await Order.find({'$where': `this.createdAt.toJSON().slice(0, 10) == "${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate()-i}"`})
        sell.push(order.length)
    }
    res.json(sell.reverse())
  }
}

export default connectDb(handler)