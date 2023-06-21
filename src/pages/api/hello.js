import connectDb from "@/middleware/mongoose"
import Feedback from "@/models/feedback"
import User from "@/models/user"

const handler = async(req, res) => {
    // let feedback = new Feedback({
    //     "name":"Sayan",
    //     "email":'sayanbiswas@gmail.com',
    //     "message":"Hello"
    // })

    // await feedback.save()
    let user = User.find({})
    console.log(user)
    res.json("data")
}

export default connectDb(handler)