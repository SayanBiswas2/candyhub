import connectDb from "@/middleware/mongoose"
import Product from "@/models/product"

const handler = async(req, res) => {
  if(req.method== "POST"){
    let product = await Product.findById(req.body.id)
    res.status(200).json(product)
  }
}

export default connectDb(handler)