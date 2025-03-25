import axios from 'axios'
const axiosInstance = axios.create({
    headers:{
        'Content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance