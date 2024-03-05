import  express from "express";
import  { createProduct,getProduct,getAllProduct,updateProduct,deleteProduct} from "../controllers/productController.js";
import { validation,checktoken } from "../middleware/validation.js";
import {categorySchema,productSchema } from "../controllers/category&productValidation.js"
const produectRouter = express.Router();

produectRouter.use(express.json());

produectRouter.post("/createProduct",checktoken(),validation(productSchema),createProduct);
produectRouter.get("/getProduct",checktoken(),getProduct);
produectRouter.get("/getAllProduct",checktoken(),getAllProduct);
produectRouter.put("/updateProduct",checktoken(),validation(productSchema),updateProduct);
produectRouter.delete("/deleteProduct",checktoken(),deleteProduct);

export default  produectRouter;