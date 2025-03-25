const {onRegister,onLogin, onForgetPassword, onResetPassword}  = require("../CONTROLLER/auth.controller")
module.exports = (app)=>{
   app.post("/register", onRegister)
   app.post('/login', onLogin)
   app.post("/forget", onForgetPassword)
   app.post("/reset", onResetPassword)
}