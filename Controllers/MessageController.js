const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const conversationModel =require('../Models/conversationModel');
const messageModel = require("../Models/messageModel");
 

const message=async(req,res)=>{
    
    const message =new messageModel(req.body)
    try {

        
        const message = new messageModel({
            conversationId:mongoose.Types.ObjectId(req.body.conversationId),
            senderId:mongoose.Types.ObjectId(req.body.senderId),
            text:req.body.text
        })
        const savedMessage =await message.save()

        res.status(200).json(savedMessage)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getMessages=async(req,res)=>{
    try {

        const messges=await messageModel.find({conversationId:mongoose.Types.ObjectId(req.params.conversationId)})
        res.status(200).json(messges)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}

module.exports={
  message,
  getMessages
}