
const { createNewShow, getAllShow, getTheatresAndShowsByMovieId, getShowDetailsByShowId } = require("../CONTROLLER/show.controller")
const { verifyToken, verifyAdminorPartner } = require("../Middlewares/auth.middleware")

module.exports = (app)=>{
   app.post("/shows",[verifyToken,verifyAdminorPartner],createNewShow) 
   app.get("/shows", [verifyToken], getAllShow)
   app.get("/shows/:id", [verifyToken], getShowDetailsByShowId)
   app.get("/movies/:movieId/shows",[verifyToken], getTheatresAndShowsByMovieId)

}