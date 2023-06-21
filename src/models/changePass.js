const mongoose = require('mongoose');

const ChangePassSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    token:{type:String,required:true,unique:true},
    createdAt: { type: Date, expires: '20m', default: Date.now }
  });

mongoose.models = {}
export default mongoose.model('ChangePass',ChangePassSchema)