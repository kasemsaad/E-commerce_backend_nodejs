import mongoose from 'mongoose'
 const initconection = ()=>{
mongoose.connect('mongodb://127.0.0.1:27017/E-commerce-project').
then(()=>console.log("database conected" ))
.catch((err)=>console.log("database error",err))
}
export {initconection};