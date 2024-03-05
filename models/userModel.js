import mongoose from 'mongoose'
const schema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:String,
    password:{  
    type:String,  
    require:true
        },
        isVerified:{
            type:Boolean
            ,default:false
        },
        role:String,
        Adresse:[String],
        resetkey:String,

},

{
    timestamps:true
}
)
const userModel =mongoose.model("User",schema)
export default userModel;
