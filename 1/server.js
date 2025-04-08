const express=require('express')
const app=express()
const port=3000

// // loading middleware  into app
app.use(express.json())

// // middleware -logging ,auth ,validation 
// const loggingMiddleware= function(req,res,next){
//     console.log('Login ker rha hu')
//     next();
// }
// app.use(loggingMiddleware);


// const authMiddleware=function(req,res,next){
//     console.log('auth  ho rha h')
//     console.log('auth fail ghar jao')
//     // next();
// }
// app.use(authMiddleware);


// const validationMiddleware=function(req,res,next){
//     console.log('validation ho rha h')
//     next();
// }
// app.use(validationMiddleware);

const route = require('./routes/route')
// mounting 
app.use('/api',route)


app.get('/',(req,res)=>{
    console.log('mai route handler hu')
    console.log(req.body)
    res.send('hello world')
})

app.listen(port,()=>{
    console.log(`server is running on port on ${port}`)
})