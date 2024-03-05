import { productModule } from "../models/productModel.js";
import handleAsyncError from "../utils/handleAsyncError.js";
import userModul  from "../models/userModel.js";


const createProduct = handleAsyncError(async (req, res) => {
  let checkcreateProduct = await productModule.findOne({ productname: req.body.productname });
  // console.log(req.body);
  if (checkcreateProduct) {
      res.json("Product name is already found");
    } else {
      let add= await productModule.create({
         productname: req.body.productname,
        slug:req.body.slug,
        priceafterdiscount:req.body.priceafterdiscount,
        finalprice:req.body.finalprice,
        image:req.body.image,
        category:req.body.category,
        stock:req.body.stock}
    );
    res.json({done:add});
  }
});

const getProduct=handleAsyncError( async(req,res)=>{
let checkProduct = await productModule.findOne({ productname:req.body.productname });
// console.log(req.body);
if (checkProduct) {
  let get= await productModule.findOne({productname:req.body.productname})
  res.json({done:get});

  } else {
    res.json("not found Product");
}
});

const getAllProduct=handleAsyncError(async(req,res)=>{
  const page=req.query.page * 1||1;
  const limit=req.query.limit * 1||4;
  const skip=(page-1)*limit
let get = await productModule.find().skip(skip).limit(limit);
// console.log(req.body);
  res.json({result:get.length,page,data:get});
});

const updateProduct = handleAsyncError(async (req, res) => {
  let checkProduct = await productModule.findOne({ _id: req.body._id });

  if (checkProduct) {
    let update = await productModule.findOneAndUpdate(
      { _id:req.body._id }, 
      { 
        productName:req.body.productName,
        slug: req.body.slug,
        priceafterdiscount: req.body.priceafterdiscount,
        finalprice: req.body.finalprice,
        image: req.body.image,
        category: req.body.category,
        stock: req.body.stock
      },
    );
    await checkProduct.save(); 

    res.json({ done_update: update });
  } else {
    res.json("Product not found");
  }
});


const deleteProduct = handleAsyncError(async (req, res) => {
  let token=jwt.verify(req.headers.authorization,"hhhhhh")
  
  let role = await userModul.findOne({ _id:token.id});
  if(role.role=="admin"){
  let checkProduct = await productModule.findOne({ _id:req.body._id });
  if (checkProduct) {
    let deleted  = await productModule.deleteOne({ _id:req.body._id });
if(deleted)res.json("deleted");
  } else {
    res.json("Product not found");
  }}
});
export{
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
}

