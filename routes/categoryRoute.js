import  express from "express";
import  { createCategory,getCategory,getAllCategory,updateCategory,deleteCategory } from "../controllers/categoryController.js";
import { validation,checktoken } from "../middleware/validation.js";
import {categorySchema,productSchema } from "../controllers/category&productValidation.js"

const categoryRouter = express.Router();

categoryRouter.use(express.json());

categoryRouter.get("/getCategory",checktoken(),getCategory);
categoryRouter.post("/createCategory",checktoken(),validation(categorySchema),createCategory);
categoryRouter.get("/getAllCategory",checktoken(),getAllCategory);
categoryRouter.put("/updateCategory",checktoken(),validation(categorySchema),updateCategory);
categoryRouter.delete("/deleteCategory",checktoken(),deleteCategory);
categoryRouter.use("/uploads",express.static("uploads")) 

export default  categoryRouter;