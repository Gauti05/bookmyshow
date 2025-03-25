const { default: mongoose } = require("mongoose");
const MovieModel = require("../Models/movie.model")

//all authenticated user
const getAllMovies = async(req,res) =>{
  console.log("get movie fun called")

   try{
const allMovies = await MovieModel.find({});
console.log(allMovies)
return res.status(200).send({
  success:true,
  message:"all movies have been fetched",
  data:allMovies
  // console.log(data)
})
   }
   catch(err){
    return res.status(500).send({message:"Internal server error", err})
  }


}



const getAllMoviesById = async(req,res) =>{
  console.log("get movie fun called")

   try{
const allMovies = await MovieModel.findById(req.params.id);
console.log(allMovies)
return res.status(200).send({
  success:true,
  message:"all movies have been fetched",
  data:allMovies
  // console.log(data)
})
   }
   catch(err){
    return res.status(500).send({message:"Internal server error", err})
  }


}

//authenticated user 
//only admin user : authorisation
const createNewMovie = async(req,res)=>{


  try{
const newMovie = new MovieModel(req.body)

  const response =   await newMovie.save()
  if(response!=null){
    return res.status(201).send({
      success:true,
      message:"movie created succesfully"}
    )
  }



  }
  catch(err){
    return res.status(500).send({message:"Internal server error", err})
  }
}


const updateMovieById = async(req,res)=>{
// console.log("movie updated")
const movieId = req.params.id
if(!mongoose.Types.ObjectId.isValid(movieId)){
  return res.status(404).send({
    success:false,
    message:`movie is ${movieId} is not valid`
  })
}
try{
  const movie = await MovieModel.findById(movieId);
  if(!movie){
    return res.status(404).send({
      success:false,
      message:`movie id ${movieIdid} not found`
    })
    
  }
  const updateres = await MovieModel.findByIdAndUpdate(movieId,req.body, {new:true})
  if(updateres){
    return res.status(200).send({
      success:true,
      message:`the data movie Id: ${movieId} is updated succesfully`,
      date:updateres
    })
  }
}
catch(err){
  return res.status(500).send({message:"internal server error", err})
}
}

const deleteMovieById = async(req,res)=>{
  const movieId = req.params.id
  if(!mongoose.Types.ObjectId.isValid(movieId)){
    return res.status(404).send({
      success:false,
      message:`movie is ${movieId} is not valid`
    })
  }
  try{
    const movie = await MovieModel.findById(movieId);
    if(!movie){
      return res.status(404).send({
        success:false,
        message:`movie id ${movieId} not found`
      })
      
    }
    const delresponse = await MovieModel.findByIdAndDelete(movieId)
    if(delresponse!=null && delresponse.deleteCount!=0){
      return res.status(200).send({
        success:true,
        message : ` the movie id ${movieId} is deleted successfully`
      })
    }
  }
  catch(err){
    return res.status(500).send({message:"internal server error", err})
  }


}

module.exports = {
    getAllMovies,
    createNewMovie,
    updateMovieById,
    deleteMovieById,
    getAllMoviesById
}