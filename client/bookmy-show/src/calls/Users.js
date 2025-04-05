import axiosInstance from ".";

export async function RegisterUser(data){
    try{
        const response =  await axiosInstance.post("https://bookmyshow-3-38cj.onrender.com/register", {
            name:data.name,
            email:data.email,
            password:data.password
           
        })
        return response
    }
    catch(err){
return err.response
    }

}

export async function LoginUser(data) {
    try{
        const response =  await axiosInstance.post("https://bookmyshow-3-38cj.onrender.com/login", {
          
            email:data.email,
            password:data.password
           
        })
        return response
    }
    catch(err){
return err.response
    }
    
}


// export async function ForgetPasswordAPI(data) {
//     console.log("Make an API call with data",data);

//     try{
//         const response =  await axiosInstance.post("http://localhost:8000/forget", {
          
//             email:data.email
         
           
//         })
//         return response
//     }
//     catch(err){
// return err.response
//     }
    
// }



export async function ForgetPasswordAPI(data){
    console.log("Make an API call with data",data);

    try{
         const response = await axiosInstance.post("https://bookmyshow-3-38cj.onrender.com/forget",{
        email:data.email
        });

       return response;
    }
    catch(err){
        return err.response;
    }
}


export async function ResetPasswordAPI(data){
    console.log("Make an API call with data",data);

    try{
         const response = await axiosInstance.post("https://bookmyshow-3-38cj.onrender.com/reset",{
        otp:data.otp,
        password:data.password
        });

       return response;
    }
    catch(err){
        return err.response;
    }
}
