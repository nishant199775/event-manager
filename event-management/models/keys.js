const mongoose=require('mongoose');
const userModel=require('./users')
const eventModel=require('./events')
const keysSchema=mongoose.Schema({
    key:{
        type:String,
    },
    attendance:{
        type:Boolean,
        
    },
    event:{
        type:mongoose.Types.ObjectId,
        ref:'userModel'
    },
    user:
    {
        type:mongoose.Types.ObjectId,
        ref:'eventModel'
    },
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('keys',keysSchema)