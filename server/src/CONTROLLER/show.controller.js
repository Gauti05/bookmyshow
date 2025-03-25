const { default: mongoose } = require("mongoose")
const MovieModel = require("../Models/movie.model")
const showModel = require("../Models/show.model")
const theatreModel = require("../Models/Theatre.model")

const createNewShow =async (req,res)=>{
  

    const{theatre,movie} = req.body

    try{
        
    const theatremovieobj =  await theatreModel.findById(theatre)

if(theatremovieobj==null){
    return res.status(400).send({
        success:false,
        message:"theatre is is invalid"
    })
}

const movieobj = await MovieModel.findById(movie)


if(movieobj==null){
    return res.status(400).send({
        success:false,
        message:"movie id is invalid"
    })
}


const newShow = new showModel(req.body);
await newShow.save()
        return res.status(201).send({
          success:true,
          message:"new show has been added succesfully",
        //   date:allMovies
        })
           }
           catch(err){
            return res.status(500).send({message:"Internal server error", err})
          }


}


const getAllShow = async(req,res)=>{
    try{
const allshows = await showModel.find({}).populate("theatre").populate("movie")

return res.status(201).send({
    success:true,
    message:"show has been fatched succesfully",
    data:allshows
  })


    }
catch(err){
            return res.status(500).send({message:"Internal server error", err})
          }

}

const getTheatresAndShowsByMovieId = async(req,res)=>{
    const {movieId} = req.params;
    const {date} = req.query;

    // list of unique theatres and the shows for this movie in that theatre 

    let allShows = await showModel.find({movie:movieId}).populate("theatre");


    //first get all unique theatres from the shows 


    let allUniqueTheatres = [];

    allShows.forEach((show)=>{
        const theatre = allUniqueTheatres.find((theatreId)=>{
            return theatreId === show.theatre._id;
        });
        if(!theatre){
            allUniqueTheatres.push(show.theatre._id);
        }
    });


    const uniqueTheatresAndTheirShows = allUniqueTheatres.map((theatreId)=>{

        //get all shows for this theatreId 

        const allShowsForParticularTheatre = allShows.filter((show)=>{
            return show.theatre._id === theatreId
        });

        
        return {

            theatreId,
            theatreDetails: allShowsForParticularTheatre[0].theatre,
            allShowsForParticularTheatre
        }

    })

    return res.status(200).send({
        success:true,
        message:"All Shows Fetched for the given movie",
        data:uniqueTheatresAndTheirShows  
    })

 
}


const getShowDetailsByShowId = async(req,res)=>{
try {
   const showId = req.params.id;
if(!mongoose.Types.ObjectId.isValid(showId)){
    return res.status(400).send({
        success:false,
        message:"showid is invalid format"
    })
}


   const show = await showModel.findById(showId).populate("theatre").populate("movie");
   if(!show){
    return res.status(400).send({
        success:false,
        message:"showid is incorrect"
    })
   }
   return res.status(200).send({
    success:true,
    message:"show fetched succesfully",
    data:show
   })

} 
catch (err) {
    return res.status(500).send({message:"internal server err", err})
    
}
}

module.exports={
createNewShow,
getAllShow,
getTheatresAndShowsByMovieId,
getShowDetailsByShowId
}