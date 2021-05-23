const mongoose=require('mongoose');
const events=require('./events')
const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
    },
    role:
    {
        type:Number,
        default:0
    },
    joinedEvents:[{type:mongoose.Types.ObjectId,ref:'events'}]
    
},{
    timestamps:true
}
)

module.exports=mongoose.model('users',userSchema);