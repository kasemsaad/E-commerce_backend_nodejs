import express from 'express';
// import morgan from 'morgan';
import {initconection}from "./config/connection.js"
import categoryRouter from "./routes/categoryRoute.js"
import produectRouter from "./routes/productRoute.js"
import userRouter     from "./routes/userRoute.js"
import multer from 'multer'
import {v4 as uuidv4 } from 'uuid'
import photogeModel from './models/photoModel.js';
//express
const app = express();
app.use(express.json());


//database criation
initconection(); 


app.use(userRouter);
app.use(categoryRouter);
app.use(produectRouter);





app.use("/uploads",express.static("uploads")) 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,uuidv4()+"_" +file.originalname)  // null /error
    }
  })
  
const upload=multer({storage})
app.post("/photo",upload.single('photo'),async(req,res)=>{
    let add=await photogeModel.insertMany({photo:req.file.filename,title:req.body.title })
    res.json({message:"image",add})
})





const port = 7001; // Example port number within the valid range
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});