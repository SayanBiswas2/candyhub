import connectDb from "@/middleware/mongoose"
import Product from "@/models/product"

const handler = async(req, res) => {
  if(req.method == "POST"){
    let product = new Product({
        name:req.body.name,
        price:req.body.price,
        desc:req.body.desc,
        img:req.body.img,
        keyWords:req.body.keyWords
    })
    await product.save()
    res.status(200).json(product)
  }
}

export default connectDb(handler)