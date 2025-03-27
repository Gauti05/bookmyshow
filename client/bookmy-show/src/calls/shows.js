import axiosInstance from ".";

export async function GetShowsForMovie(movieId, date){
    try{
        const response =  await axiosInstance.get(`http://localhost:8000/movies/${movieId}/shows?date=${date}`)
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}

export async function GetShowsDetailsById(showId){
    try{
        const response =  await axiosInstance.get(`http://localhost:8000/shows/${showId}`)
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}



// import axiosInstance from ".";


