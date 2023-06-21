const mongoose = require('mongoose');

const TempUserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    otp:{type:Number,required:true},
    createdAt: { type: Date, expires: '20m', default: Date.now }
  });

mongoose.models = {}
export default mongoose.model('TempUser',TempUserSchema)