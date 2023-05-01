const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotificatonSchema=new Schema({

    postId:{
        type:ObjectId,
    },
    senderName:{
        type:String,
        required:[true,"user name is required"]
    },
    senderId:{
        type:ObjectId,
    },
    userId:{
        type:ObjectId,
        required:[true,"user id is required"]
    },
    message:{
        type:String
    },
    readed:{
        type:Boolean,
        default:false
    }
 },
 {timestamps:true}
)

module.exports=mongoose.model("notification",NotificatonSchema)