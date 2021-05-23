const mongoose=require('mongoose');
const users=require('./users')
const eventsSchema=mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    date:{
        type:Date,
    },
    fees:{
        type:Number,
    },
    location:{
        type:String,
    },
    type:{
        type:String,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    participants:
    [{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }],
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('events',eventsSchema)