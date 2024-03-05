import Joi from "joi";
const categorySchema =Joi.object({
  name:Joi.string().alphanum().min(3).max(30).required(),
  image:Joi.string(),
  createdBy:Joi.string().required()
  

  })
  const productSchema =Joi.object({
    
    productname:Joi.string().alphanum().min(3).max(30).required(),
    slug:Joi.string().alphanum().min(3).max(30).required(),
    priceafterdiscount:Joi.number().required(),
    finalprice:Joi.number().required(),
    image:Joi.string(),
    category:Joi.string().required(),
    stock:Joi.number().required()

  })
  export{
    categorySchema,
    productSchema    
  }