import connectDb from "@/middleware/mongoose"
import Product from "@/models/product"

const handler = async(req, res) => {
  if(req.method == "POST"){
    let id= req.body.id
    let newData = req.body
    try{
        let product = await Product.findByIdAndUpdate(id,{
            name:newData.name,
            desc:newData.desc,
            price:newData.price,
            img:newData.img,
            keyWords:newData.keyWords,
        })
        res.staus(200).json("success")
    }catch{
        res.status(500)
    }
  }
  if(req.method === "DELETE"){
    await Product.findByIdAndDelete(req.query.id)
    res.status(200).json("deleted")
  }
}

export default connectDb(handler)