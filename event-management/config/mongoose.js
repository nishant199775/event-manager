const mongoose=require('mongoose');
const url=`mongodb+srv://Nishant:Nishant@123@cluster0.8pcvi.mongodb.net/Event-Manager?retryWrites=true&w=majority`
const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
mongoose.Promise=global.Promise
mongoose.connect(url,connectionParams)
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',()=>{
    console.log('connected to db successfully');
})