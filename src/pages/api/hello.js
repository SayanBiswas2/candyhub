import connectDb from "@/middleware/mongoose"
import { NextResponse } from "next/server"

const handler = async(req,res) => {
    // let feedback = new Feedback({
    //     "name":"Sayan",
    //     "email":'sayanbiswas@gmail.com',
    //     "message":"Hello"
    // })

    // await feedback.save()
    // let user = User.find({})
    // console.log(user)
    res.json("done")
    NextResponse.json("done")
}

export default connectDb(handler)