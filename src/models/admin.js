const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,default:0},
    password:{type:String,required:true},
    permission:{type:Object,required:true}
  });

mongoose.models = {}
export default mongoose.model('Admin',AdminSchema)