import axiosInstance from ".";

export async function GetShowsForMovie(movieId, date){
    try{
        const response =  await axiosInstance.get(`https://bookmyshow-3-38cj.onrender.com/movies/${movieId}/shows?date=${date}`)
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}

export async function GetShowsDetailsById(showId){
    try{
        const response =  await axiosInstance.get(`https://bookmyshow-3-38cj.onrender.com/shows/${showId}`)
        return response
        // console.log(response)
    }

    catch(err){
return err.response
    }

}



// import axiosInstance from ".";


