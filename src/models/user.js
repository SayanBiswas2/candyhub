const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,default:0},
    password:{type:String,required:true},
    cart:{type: Object,default:{
      'currentCart':{Object},
      'letterCart':{Object},
    }},
    address:{type:Object,default:{
      'name':"",
      'mobile':"",
      'pin':"",
      'locality':"",
      'address':"",
      'district':"",
      'state':""
    }}
  },{timestamps:true});

mongoose.models = {}
export default mongoose.model('User',UserSchema)