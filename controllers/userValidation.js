import Joi from "joi";
const signupSchema =Joi.object({
  userName:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string()
    .email({minDomainSegments:2, tlds:{allow:["com"]}}).required(),
      password:Joi.string().pattern(/^[A-z][a-z0-9]{3,8}$/).required(),
    passwordconfi:Joi.string().valid(Joi.ref('password')).required().strict(),
    // role:Joi.string(),
    Adresse:Joi.array().items(Joi.string()),
    resetkey:Joi.string()
    // Adressed2:Joi.string()#
    // address: Joi.array().items(Joi.string())

  })
  const signinSchema =Joi.object({
    email:Joi.string()
    .email({minDomainSegments:2, tlds:{allow:["com"]}}).required(),
      password:Joi.string()
    .pattern(/^[A-z][a-z0-9]{3,8}$/).required(),
  })
  export{
    signupSchema,
    signinSchema
  }