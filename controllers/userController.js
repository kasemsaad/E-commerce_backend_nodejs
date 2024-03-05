import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {sendemail,resetpassword} from "../utils/sendouremail.js"

import handleAsyncError from "../utils/handleAsyncError.js";

const signup = handleAsyncError(async (req, res) => {
    let checkEmail = await userModel.findOne({ email: req.body.email });
    // console.log(checkEmail);

    if (checkEmail) {
      res.json("email is already found");
    } else {
        let hashpassword = bcrypt.hashSync(req.body.password, 10);
        let adduser = await userModel.insertMany({
          userName: req.body.userName,
            email: req.body.email,
            password: hashpassword,
            // role:req.body.role,
            Adresse:req.body.Adresse,
            resetkey:"String"
            // Adressed2:req.body.Adressed2,
          
    });
    let token=jwt.sign
    ({
      id:[0]._id},"verfication",
    )
    sendemail(req.body.email,{url:`http://localhost:7001/user/verify/${token}`})
        res.json({done:adduser});
    // }
}})


  const signin=handleAsyncError(async(req,res)=>{
    // console.log(req.headers.authorization)
 
   let checkin=await userModel.findOne({ email:req.body.email});
   console.log(checkin);
   if(!checkin)
   return res.json({messge:"email is not found"})
let changhash=bcrypt.compareSync(req.body.password , checkin.password)
if(changhash){
  let token=jwt.sign({id:checkin._id,name:checkin.userName},"hhhhhh")

  res.json({messge:"hello",token})
}else{
  res.json({messge:"passowrd not valid"})
}
// }

})



//  const userdata=handleAsyncError(async(req,res)=>{
//   jwt.verify(req.body.token,"hhhhhh", async function(err,decoded){
//     let userdata=await userModel.findById(decoded.id);
//      res.json({messge:"done",userdata})

//   }) 
// })
//  const veraccount=handleAsyncError(async(req,res)=>{
//      res.json({messge:"hellooo"})
//     })
  


const  forgetPassword=handleAsyncError(async(req,res)=>{
  let checkemail=await userModel.findOne({ email:req.body.email});
  if(checkemail){
  let data=checkemail
  let tokenpassword=jwt.sign({id:data._id,name:data.userName},"hhhhhh") 
   await userModel.findOneAndUpdate(
    { _id:data._id }, 
    { 
      resetkey:tokenpassword,
    },
  );
  await data.save(); 

  await resetpassword(req.body.email,`http://localhost:7001/resetpassword/${tokenpassword}`)

  res.json({message:"send verification to reset password"});
  }
else{
  return res.json({message:"email is not found"})
}
});

const addNewpassword=handleAsyncError(async(req,res)=>{
  let token=jwt.verify(req.params.token,"hhhhhh")
  // console.log(token)
  let checkin=await userModel.findOne({ _id:token.id});
  // console.log(checkin.resetkey)
  if(req.params.token==checkin.resetkey){
  if(!checkin) {
      res.json({message:"id not found"})
  }else {
    const passwordPattern = /^[A-Za-z][A-Za-z0-9]{3,8}$/;
    if (!passwordPattern.test(req.body.password)) {
      return res.json({ message: "Password must start with a letter and be 4-9 characters long" });
    }
    let hashpassword = bcrypt.hashSync(req.body.password, 10);
    // console.log(hashpassword)

    checkin.password = hashpassword;
    checkin.resetkey="null";
    await checkin.save(); 
    // console.log(checkin.password)
      res.json({message:"done update Newpassword"})
  }
}else{
      // console.log("checkin.password")

  res.json({message:"token expired or not valid"})
}


});


   export { 
    signup 
    ,
    signin
    ,
    // userdata 
    // ,
    // veraccount 
    // ,
    // checktoken,
    forgetPassword
    ,
    addNewpassword
  }