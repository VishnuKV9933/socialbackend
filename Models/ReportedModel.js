const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReportedSchema=new Schema({

    postId:{
        type:ObjectId,
        required:[true,"post id is required"]
    },

    postOwner:{
        type:String,
        required:[true,"postowner is required"]
    },
   
    reportDeteils:{
        type:Array,
        required:[true,"reportDeteils  is required"]
    },
    blocked:{
        type:Boolean,
        default:false
    }
 },
 {timestamps:true}
)

module.exports=mongoose.model("repoertposts",ReportedSchema)