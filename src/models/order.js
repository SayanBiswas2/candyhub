const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {type:String},
    userId:{type:String,required:true},
    products:{type:Array,required:true},
    address:{type:Object,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:'pending'}
  },{timestamps:true});

mongoose.models = {} 
export default mongoose.model('Ordeer',OrderSchema)