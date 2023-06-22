const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type:String,required:true},
    desc:{type:String,required:true},
    img:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    availableQty:{type:Number},
    keyWords:{type:Array,required:true}
  },{timestamps:true});

  mongoose.models = {}
  
  export default mongoose.model('Product',ProductSchema)