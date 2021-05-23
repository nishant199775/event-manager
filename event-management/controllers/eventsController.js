const events=require('../models/events');
const users=require('../models/users')

module.exports.getEvents=async (req,res)=>{
  try{
    const allEvents=await events.find({}).populate('createdBy');
    res.json('200',{message:'events generated successfully',events:allEvents});
  }
    catch(err){
        console.log(err);
        res.json('500',{message:'error in getting events from db',error:err})
    }

}

module.exports.create=async (req,res)=>{
    try{
        const data=req.body;
        data['createdBy']=req.query.user_id;
        const event=await events.create(data);
        res.json('200',{message:'event created successfully',event:event});
      }
        catch(err){
            console.log(err);
            res.json('500',{message:'error in creating event from db',error:err})
        }
}

module.exports.addUser=async (req,res)=>{
    try{
        const user_id=req.query.user_id;
        const event_id=req.query.event_id;

        const event=await events.findById(event_id).populate('createdBy');

        if(event.createdBy.id===user_id)
        {
            return res.json('200',{message:"host and participant cannot be same"})
        }
        else{

            await users.findByIdAndUpdate(user_id,{$push:{'joinedEvents':event_id}})

            await events.findByIdAndUpdate(event_id,{$push:{'participants':user_id}})

            res.json('200',{message:"user added successfully"})

        }

        


    }
    catch(err){
        res.json('500',{message:"error in adding user from db"})
    }
}

module.exports.showJoinedUsers=async (req,res)=>{
    try{
        const event_id=req.query.event_id;
      const allUsers=await events.findById(event_id,{participants:1}).populate('participants');
      res.json('200',{message:'users found successfully',allUsers:allUsers.participants});
    }
      catch(err){
          console.log(err);
          res.json('500',{message:'error in getting joinedUsers from db',error:err})
      }
  
  }