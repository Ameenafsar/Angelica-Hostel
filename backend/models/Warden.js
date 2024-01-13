const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardenSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    father_name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    aadhar_card:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Warden = mongoose.model('warden',WardenSchema);