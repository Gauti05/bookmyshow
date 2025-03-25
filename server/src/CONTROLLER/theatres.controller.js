const theatreModel = require("../Models/theater.model");

const createTheatre = async(req,res)=>{

    const theatreDetails = req.body;
    theatreDetails.owner = req.userDetails._id
// console.log(theatreDetails)


try{
    const newTheatre = new theatreModel(theatreDetails)

await newTheatre.save()

    return res.status(201).send({
      success:true,
      message:"new theatre has been added succesfully",
    //   date:allMovies
    })
       }
       catch(err){
        return res.status(500).send({message:"Internal server error", err})
      }
}


const getAllTheatre = async(req,res)=>{

    try{
        
        const allTheatres = await theatreModel.find({}).populate("owner")
    
        return res.status(200).send({
          success:true,
          message:"all theatres fetched successfully",
          data:allTheatres
        //   date:allMovies
        })
           }
           catch(err){
            return res.status(500).send({message:"Internal server error", err})
          }
}

module.exports = {
    createTheatre,
    getAllTheatre
}