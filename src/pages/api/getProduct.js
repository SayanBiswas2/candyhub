import Product from "@/models/product"
import connectDb from "@/middleware/mongoose"

const handler = async(req, res)=> {
    let id = req.query.slug
    try{
      let product= await Product.findById(id)
      res.status(200).json(product)
    }catch{
      res.json("undefined")
    }
  }

  export default connectDb(handler)