const express=require('express')
const db=require('./config/mongoose')
const app=express();
const port=7000
const router=require('express-router');
const passportJWT=require('./config/passport-jwt-strategy')
app.use(express.urlencoded())

// setting up router
app.use('/',require('./routes/index'))


app.listen(port,(err)=>
{
    if(err)
    console.log("error in starting server",err);
    else
    console.log(`server started at `,port);
})