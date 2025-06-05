
const {createTheatre, getAllTheatre} = require("../CONTROLLER/theatres.controller")
const { verifyToken, verifyAdminorPartner } = require("../Middlewares/auth.middleware")

module.exports = (app)=>{
   app.post("/theatres",[verifyToken,verifyAdminorPartner] , createTheatre) 
   app.get("/theatres", [verifyToken,verifyAdminorPartner], getAllTheatre)
}


