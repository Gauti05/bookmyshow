import axiosInstance from ".";

export async function GetAllMovies(){
    try{
        const response =  await axiosInstance.get("http://localhost:8000/movies")
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
        const response =  await axiosInstance.get(`http://localhost:8000/movies/${id}`)
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}