import mongoose from 'mongoose';

const photoSchema=new mongoose.Schema({
photo:String,
title:String
}
,{ timestamps:true  
})
photoSchema.pre('init',function(e){
    e.photo="http://localhost:7001/uploads/"+e.photo
})
const photogeModel=mongoose.model("photo",photoSchema)

export default photogeModel;