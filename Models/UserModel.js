const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Name is required"],
        minLength:3, 
        maxLength:20,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        minLength:3, 
        maxLength:50,
    },
    mobile:{
        type:Number,
        required:[true,"Mobile is required"], 
        unique:true,
        minLength:10,
       }, 
       password:{
        type:String,
        required:[true,"password is required"],
    },
    profilePicture:{
        type:String,
       default:null
    },
    coverPicture:{
        type:String,
       default:null
    },
    bio:{
        type:String,
       default:null
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    posts:{
        type:Array,
        default:[]
    },
    reportedPost:{
        type:Array,
        default:[]
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    block:{
        type:Boolean,
        default:false
    },
    bio:{
        type:String,
    },
    city:{
        type:String,
        maxLength:50,
        default:null
    },
    school:{
        type:String,
        maxLength:50,
        default:null
    },
},
{timestamps:true}
)

module.exports=mongoose.model("Users",userSchema)