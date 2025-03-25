const  jwt = require('jsonwebtoken');
const UserModel = require('../Models/user.model');

const verifyToken = (req,res,next)=>{

    const tokenString = req.headers["authorization"] 
    if(!tokenString){
        return res.status(403).send({message:"no token is provided"})
    }
const token = tokenString.split(' ')[1]
jwt.verify(token, process.env.SECRET,async(err,payload) =>{
    if(err){
        return res.status(403).send({message:"invalid jwt token"})
    }

   const userId = payload.userId

   try{

   const user =  await UserModel.findById(userId);
   req.userDetails = user
   }
catch(err){

}

    next()
})

// const isAuthenticated = false

// if(!isAuthenticated){
//     return res.status(403).send({message:"you are not allowed to access this route"})
// }
// next()
    
}



const verifyAdmin = (req,res,next)=>{
// const role = req.userDetails.role;`
if(req.userDetails.role!='admin'){
    return res.status(403).send({message:"you are anauthorised user"})
}

next()
}



const verifyAdminorPartner = (req,res,next)=>{
    // const role = req.userDetails.role;
    if(req.userDetails.role!='admin' && req.userDetails.role!='partner'){
        return res.status(403).send({message:"you are anauthorised user"})
    }
    
    next()
    }

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyAdminorPartner
}