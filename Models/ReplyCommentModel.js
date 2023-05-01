const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const ObjectId = Schema.ObjectId;
const replyCommentSchema=new Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    commentId:{
        type:ObjectId,
        required:true
    },
    postId:{
        type:ObjectId,
        required:true
    },
    reply:{
        type:String,
        requied:true
    }
},
{timestamps:true}
) 

module.exports=mongoose.model('replycomments',replyCommentSchema)