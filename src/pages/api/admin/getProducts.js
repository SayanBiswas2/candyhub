import connectDb from "@/middleware/mongoose"
import Product from "@/models/product"

const handler = async(req, res) => {
  if(req.method == "POST"){
    let searchQuery = req.body.search;
    if(searchQuery == undefined){
        let from = req.body.from
        let product = await Product.find({}).distinct('_id')
        product= product.map(id=>id.toString())
        product = product.reverse()
        product = product.slice(from,from+21)
        if(product.length < 20 ){
            res.status(503).json(product)
        }else{
            res.status(200).json(product)
        }
    }else{
        let product;
        try{
            product = await Product.findById(searchQuery)
            product = [searchQuery]
        }catch{
            product = await Product.find({keyWords:searchQuery}).distinct('_id')
            product= product.map(id=>id.toString())
            product = product.reverse()
        }
        res.status(200).json(product)
    }
  }
}

export default connectDb(handler)