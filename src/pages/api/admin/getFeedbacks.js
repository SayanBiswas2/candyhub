import connectDb from "@/middleware/mongoose"
import Feedback from "@/models/feedback"

const handler = async(req, res) => {
  if(req.method == "POST"){
    let feedbacks = await Feedback.find({})
    res.status(200).json(feedbacks)
  }
}

export default connectDb(handler)