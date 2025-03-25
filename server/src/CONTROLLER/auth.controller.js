const UserModel = require("../Models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../Utils/notificationUtils")
const otpScripts = require("../scripts/otpScripts")
//Login Route
const onLogin = async (req,res) =>{
console.log("login api called")

const{email,password} =  req.body;
//if something is missing 
if( !email || !password){
    return res.status(400).send({message:"incomplete data"})
}

try{ 
    //if user does'nt exsist
    const user = await UserModel.findOne({email:email})

    // UserModel.findOne({email:{ "$ne": null }});
    if(!user){
        return res.status(404).send({success:false, message:"user not exsist, pls register"})
    }
    //if pass is wrong

const isPasswordvalid = bcrypt.compareSync(password,user.password) //hashing for compared with hashed password

    if(!isPasswordvalid){
     return res.send({success:false, message:"srry invalid password"})
    }
    var token = jwt.sign({ userId:user._id }, process.env.SECRET);
    console.log(token)
    //login successfully
    return res.send({
        success:true,
        message:"login successfully",
        token:token
    })
}
catch(err){
    
    return res.status(500).send({message:"Internal Server Error! Please try again",err});

}

}



//Register route
const onRegister = async(req,res) =>{
// console.log("register api called")
// console.log(req.body)


const{name,email,password} =  req.body;
//if something is missing
if(!name || !email || !password){
    return res.status(400).send({message:"incomplete data"})
}

try{
    // if user is already registered
    const user = await UserModel.findOne({email:email})
    if(user){
        return res.send({success:false, message:"Email already exsist"})
    }
//registarion succesfull

//use hashing,salt algo for storing password
const salt = await bcrypt.genSalt(10)
const hashpassowrd = bcrypt.hashSync(req.body.password,salt)
console.log(hashpassowrd)
req.body.password = hashpassowrd

    const newUser = new UserModel(req.body)
    await newUser.save();
    return res.status(201).send({success:true,message:"Registation succesfull, please login"})
}
catch(err){
    
    return res.status(500).send({message:"Internal Server Error! Please try again",err});

}


}



//forgetpasss

const onForgetPassword = async(req,res)=>{
const {email} = req.body
if(!email){
    return res.status(401)
    .send({
        success:false,
        message:"email is missing"
    })
}

try{
let user = await  UserModel.findOne({email:req.body.email})
if(user===null){
    return res.status(404)
    .send({
        success:false,
        message:"user not found with this email"
    })
}
//email is correct

//generate an otp and send that otp to email addrres
const otp = otpGenerator();
console.log(otp)

//store otp
user.otp = otp;
user.otpExpiry = Date.now() + 2 * 60 * 1000

await user.save()


//send that otp to reg user email
// sendEmail([user.email], "reset password for booking app", otpScripts(user.name,user.email,otp))
     //send that OTP to the email address 
     sendEmail([user.email],"Reset Password for Bookings App",otpScripts(user.name,user.email,otp));



return res.status(200)
.send({
    success:true,
    message:`otp sent successfully on email-id ${user.email}`
})
}
catch(err){
console.log(err)
}
}

const onResetPassword = async(req,res)=>{
    // res.send("password reset successfully")
    const{otp,password} = req.body;
    if(!otp || !password){
        return res.status(400).send({
            success:false,
            message:"either otp or pass in not passed"
        })
    }

    const user =  await UserModel.findOne({otp:otp})
    if(user === null){
return res.status(400).send({success:false, message:"otp is incorrect"})
    }

    if(Date.now()>user.otpExpiry){
        return res.status(400).send({success:false, message:"otp is expired"})
    }

    const salt = await bcrypt.genSalt(10)
const hashpassowrd = bcrypt.hashSync(password,salt)
user.password = hashpassowrd
user.otp = null
user.otpExpiry = null
await user.save();
return res.status(200).send({
    success:true,
    message:"Password reset succesfully"
})
// console.log(hashpassowrd)
// req.body.password = hashpassowrd
}

module.exports ={
    onLogin,
    onRegister,
    onForgetPassword,
    onResetPassword
}


function otpGenerator(){
    return Math.floor((Math.random()*1000) + 90000)
}