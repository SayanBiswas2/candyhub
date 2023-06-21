import Product from "@/models/product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
  if(req.method == "POST"){
    let search = req.body.slug
    let product;
    try{
        search = search.split(" ")
        product = await Product.find({keyWords:{$all:search}})
    }catch{
        product = await Product.find({keyWords:search})
    }
    

    product = product.splice(req.body.from,req.body.from+21)

    //array of product with id,name and image
    let idProduct = []
    product.map(elm=>{
        idProduct.push({
            id:elm.id,
            name:elm.name,
            img:elm.img,
            price:elm.price,
        })
    })

    let status = idProduct.length < 20 ? 500 : 200

    res.status(status).json(idProduct)
  }
}

export default connectDb(handler)