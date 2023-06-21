import connectDb from "@/middleware/mongoose"
import Feedback from "@/models/feedback"

const handler = async(req, res) => {
  if(req.method == "POST"){
    try{
        // saving a new feedback
        let feedback = new Feedback({
            "name":req.body.name,
            "email":req.body.email,
            "message":req.body.message,
        })
        await feedback.save()
        res.status(200).json("success")
    }catch{
        res.status(500)
    }
  }
}

export default connectDb(handler)