const token=require('../models/keys')
const crypto=require('crypto')
const users=require('../models/users')


module.exports.create=async (req,res)=>{
    try{
        const user_id=req.query.user_id;
        const event_id=req.query.event_id;
        const id=crypto.randomBytes(16).toString('hex');

        const key=await token.create({key:id,user:user_id,event:event_id,attendance:false})
        res.json('200',{message:'token generated successfully',token:key});
    }
    catch(err){
        res.json('500',{message:"error in generating token",error:err});
    }
}

module.exports.authToken=async (req,res)=>{
    try{
        const key=req.body.token;
        const event_id=req.body.event;
        const email=req.body.email;

        const userByEmail=await users.findOne({email:email});
        console.log('user',userByEmail);
        const user_id=userByEmail.id;
         
        const TokenInst=await token.findOne({user:user_id,event:event_id})
        
        if(!TokenInst){
                return res.json('500',{message:'there is no user registered with the event'})
                }
        else{
                if(TokenInst.key==key)
                {
                    const status=await token.findByIdAndUpdate(TokenInst._id,{attendance:true},{new:true});
                    res.json('200',{message:'attendance marked successfully',status:status})
                    
                }
                else{
                    return res.json('500',{message:'token doesnot match'})
                }
            }
        }
        catch(err){
            res.json('500',{message:'error in marking attendance',error:err});
        }

}