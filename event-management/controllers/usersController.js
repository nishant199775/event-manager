const jwt = require('jsonwebtoken');
const users=require('../models/users')
const events=require('../models/events')


module.exports.home=function(req,res){
    res.json({message:"in home of signup"});
}

module.exports.create=async function(req,res){
    // if(req.body.password!=req.body.confirmPassword)
    // {
    //     return res.redirect('back');
    // }
    try{
        const user=await users.findOne({Email:req.body.email})
      if(user)
        { 
            return res.json({message:"email already exist"});
        }
      if(!user)
        {
            const newUser=await users.create({name:req.body.name,email:req.body.email,password:req.body.password})
            console.log("created successfully");
            return res.status(200).json({message:"successfully created",
         data:newUser});
        }
      }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"error in creating user",error:err});
    }
 }

 module.exports.createSession=async function(req,res){
   try{
    const user=await users.findOne({email:req.body.email})
    if(!user || user.password!=req.body.password)
    {
      return res.json(500,{message:"username or password is incorrect"})
    }
    else{
      return res.json(200,{message:"signed in successfully",
     token:jwt.sign(user.toJSON(),'event',{expiresIn:10000})})
    }
   }
     catch(err){
       console.log(err);
       return res.json(401,{message:"error in signing from jwt",error:err});
     }
 }

 module.exports.showCreatedEvents=async (req,res)=>{
   try{
    const user_id=req.query.user_id;
    const createdEvents=await events.find({createdBy:user_id});
    res.json('200',{message:"events found successfully",data:createdEvents});
   }
    catch(err){
      res.json('500',{message:"error in finding createdEvents",error:err});
    }
    

 }