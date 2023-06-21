import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"
import Product from "@/models/product"

const handler = async(req, res) => {
  if(req.method == "POST"){
    let user = await Admin.findById(req.body.id)
    if(user !== null){
        let product = await Product.find({})
        let sell= 0;
        for(let i = 0;i<product.length;i++){
            sell += product[i].amount
        }
        res.status(200).json(sell)
    }
  }
}

export default connectDb(handler)