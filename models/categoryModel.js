import mongoose from "mongoose";

const categorySchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Category required'],
        unique:[true,'Category must be unique'],
        minlength:[3,'Too short category name'],
        maxlength:[30,'Too long category name']
    },
    image:String,
    createdBy:{
        type:String,
        minlength:[3,'Too short category name'],
        maxlength:[30,'Too long category name']
    },


},{timestamps:true}) 

const categoryModule=mongoose.model("Category",categorySchema)

export{categorySchema,categoryModule}
