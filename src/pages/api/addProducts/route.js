import product from "@/models/product"
import connectDb from "@/middleware/mongoose"

const handler = (req, res) => {
  if(req.method == 'POST'){
    for (let i = 0; i < req.body.length; i++) {
      let p = new product({
        name: req.body[i].name,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        price: req.body[i].price,
        availableQty: req.body[i].qty,
        keyWords: req.body[i].keyWords
      })
  
      p.save()
    }
    res.status(200).json("product.find")
  }else{
    res.status(400).json('product')
  }
  }

export default connectDb(handler)