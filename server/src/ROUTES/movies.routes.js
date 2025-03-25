const { getAllMovies, createNewMovie, updateMovieById, deleteMovieById, getAllMoviesById } = require("../CONTROLLER/movies.controller")
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middleware")

module.exports = (app)=>{
    app.get("/movies",[verifyToken], getAllMovies)
    app.get("/movies/:id",[verifyToken], getAllMoviesById)
    // app.get("/movies",[verfiyToken],getAllMovies);
  app.post("/movies",[verifyToken,verifyAdmin], createNewMovie)
  app.put("/movies/:id",[verifyToken,verifyAdmin],updateMovieById )
  app.delete("/movies/:id", [verifyToken], [verifyAdmin], deleteMovieById)
 }