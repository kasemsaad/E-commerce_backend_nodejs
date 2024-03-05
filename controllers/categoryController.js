import { categoryModule } from "../models/categoryModel.js";
import userModul  from "../models/userModel.js";
import handleAsyncError from "../utils/handleAsyncError.js";
import jwt from "jsonwebtoken"

const createCategory = handleAsyncError(async (req, res) => {
  let checkcreateCategory = await categoryModule.findOne({ name: req.body.name });
  // console.log(req.body);
  if (checkcreateCategory) {
      res.json("Category name is already found");
    } else {
      
      let token=jwt.verify(req.headers.authorization,"hhhhhh")
      let byname = await userModul.findOne({ _id:token.id});
      // console.log()
      let add= await categoryModule.create({
        name:req.body.name,
        image:req.body.image,
        createdBy:byname.userName

    });
    res.json({done:add});
  }
});

const getCategory=handleAsyncError( async(req,res)=>{
let checkCategory = await categoryModule.findOne({ name:req.body.name });
// console.log(req.body);
if (checkCategory) {
  let get= await categoryModule.findOne({name:req.body.name})
  res.json({done:get});

  } else {
    res.json("not found Category");
}
});

const getAllCategory=handleAsyncError(async(req,res)=>{
  const page=req.query.page * 1||1;
  const limit=req.query.limit * 1||4;
  const skip=(page-1)*limit
let get = await categoryModule.find().skip(skip).limit(limit);
// console.log(req.body);
  res.json({result:get.length,page,data:get});
});

const updateCategory = handleAsyncError(async (req, res) => {
  let token=jwt.verify(req.headers.authorization,"hhhhhh")
  
  let role = await userModul.findOne({ _id:token.id});
  if(role.role=="admin"){

  let checkCategory = await categoryModule.findOne({ _id: req.body._id });
  if (checkCategory) {
    let update = await categoryModule.findOneAndUpdate(
      { _id: req.body._id },    
      { name: req.body.name }, 
      { image: req.body.image, 
        
       createdBy: req.body.createdBy }, 
    );

    await checkCategory.save(); 

    res.json({ done_update: update });
  } else {
    res.json("Category not found");
  }
}else{
  res.json("email is not allow to updateCategory");

}
});

const deleteCategory = handleAsyncError(async (req, res) => {
  let token=jwt.verify(req.headers.authorization,"hhhhhh")
  
  let role = await userModul.findOne({ _id:token.id});
  if(role.role=="admin"){
  let checkCategory = await categoryModule.findOne({ _id:req.body._id });

  if (checkCategory) {
    let deleted  = await categoryModule.deleteOne({ _id:req.body._id });
if(deleted)res.json("deleted");
  } else {
    res.json("Category not found");
  }
}
});
export{
getCategory,
createCategory,
getAllCategory,
updateCategory,
deleteCategory
}



