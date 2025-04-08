const express =require('express')
const router = express.Router()

const auth =function(req,res,next){
    console.log('i am inside auth middleware')
    req.user={userId:1, role:"student"}
    if(req.user){
        next()
    }
    else{
        res.json(
            {
            success:false,
            message:"not a valid user",
        }
    )
    }
}

const isStudent=function(req,res,next){
    console.log("inside student middleware")

    if(req.user.role==='student')
    {
        next()
    }
    else{
        res.json(
            {
            success:false,
            message:"access denied this is for student",
        }
       )
    }
}

const isAdmin=function(req,res,next){
    console.log('i am inside admin middleware')

    if(req.user.role==='admin')
    {
       next()
    }
    else{
        res.json(
            {
            success:false,
            message:"access denied this route for admin",
        }
       )
    }
}


// routes 
router.get('/student',auth,isStudent ,(req,res)=>{
  console.log('i am inside student route')
  res.send('student specific page')
})

router.get('/admin',auth,isAdmin ,(req,res)=>{
    console.log('i am inside admin route')
    res.send('admin specific page')
  })



module.exports=router