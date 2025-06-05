import axiosInstance from ".";

export async function MakePayment(data){
    try{
        const response =  await axiosInstance.post("https://bookmyshow-2-kw91.onrender.com/payment", {
            token:data.token.id,
            amount:data.amount
           
        })
        return response
    }
    catch(err){
return err.response
    }

}


export async function CreateBooking(data){
    try{
        const response =  await axiosInstance.post("https://bookmyshow-2-kw91.onrender.com/bookings", {
            show:data.showId,
            seats:data.seats,
            transactionId : data.transactionId
           
        })
        return response
    }
    catch(err){
return err.response
    }

}