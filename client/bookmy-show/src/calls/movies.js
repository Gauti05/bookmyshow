import axiosInstance from ".";

export async function GetAllMovies(){
    try{
        const response =  await axiosInstance.get("https://bookmyshow-1-rq9t.onrender.com/movies")
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}


// import axiosInstance from ".";

export async function GetAllMovieById(id){
    try{
        const response =  await axiosInstance.get(`https://bookmyshow-1-rq9t.onrender.com/movies/${id}`)
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}