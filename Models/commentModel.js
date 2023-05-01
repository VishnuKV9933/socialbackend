const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const ObjectId = Schema.ObjectId;
const CommendSchema =new Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    userName:{
        type:String,
        required:true
    }, 
    postId:{
        type:ObjectId, 
        required:true
    },
    comment:{
        type:String,
        requied:true
    },
    reply:{
        type:Array 
    }
},
{timestamps:true}
)

module.exports=mongoose.model('comments',CommendSchema)