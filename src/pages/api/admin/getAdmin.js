import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"

const handler = async(req, res) => {
    if(req.method== "POST"){
        let admin = await Admin.findById(req.body.id)
        res.status(200).json(admin)
      }
}

export default connectDb(handler)