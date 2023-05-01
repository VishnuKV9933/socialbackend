const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema=new Schema({

    userId:{
        type:ObjectId,
        required:[true,"user id is required"]
    },
    userName:{
        type:String,
        required:[true,"user name is required"]
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    imageUrl:{
        type:String
    },
    like:{
        type:Array
    },
    comments:{
        type:Array
    },
    updated:{
        type:Boolean,
        default:false
    }, blocked:{
        type:Boolean,
        default:false
    }
 },
 {timestamps:true}
)

module.exports=mongoose.model("post",PostSchema)