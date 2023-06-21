import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"


const handler = async(req, res) => {
    let id= req.body.id
  if(req.method == "POST"){
    try{
        let product = await Admin.findByIdAndUpdate(id,{
            permission:req.body.permission
        })
        res.staus(200).json("success")
    }catch{
        res.status(500)
    }
  }
  
  if(req.method === "DELETE"){
      console.log(req.query)
        await Admin.findByIdAndDelete(req.query.id)
    res.status(200).json("deleted")
  }
}

export default connectDb(handler)