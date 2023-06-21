const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    message:{type:String,required:true,unique:true},
    createdAt: { type: Date, expires: '2d', default: Date.now }
  });

mongoose.models = {}
export default mongoose.model('Feedback',FeedbackSchema)