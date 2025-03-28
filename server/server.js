const express = require('express')
const app = express()
const mongoose = require("mongoose")
const authRoutes = require('./src/ROUTES/auth.routes')
const movieRoute = require('./src/ROUTES/movies.routes')
var bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const mongoSantize = require('express-mongo-sanitize')
const path = require("path")
// const cors = require('cors')
require('dotenv').config()
const TheaterRoutes = require('./src/ROUTES/Theater.routes')
const showRoutes = require('./src/ROUTES/show.routes')

const cors = require('cors');
const bookingRoutes = require('./src/ROUTES/booking.routes')
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json())
// app.use(cors())

// app.use(cors({ origin : '*'}))


mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("succesfully connected")
})
.catch((err) =>{
    console.log("unable to connect db", err)
})

// create a rate limiter
// const limiter = rateLimit({
//     windowsMs:5*1000,
//     max:2,
//     message:{
//         status:429,
//         error:"too many request",
//         message:"You have exceeded the request limit. please try again later"
//     }
// })

// apply the rate limiter to all the request
// app.use(limiter)




//replace my prohibited character with_
app.use(
    mongoSantize({
replaceWith:"_"
})
)
// console.log(req.body)
authRoutes(app)
movieRoute(app)
TheaterRoutes(app)
showRoutes(app )
bookingRoutes(app)



const clientBuildPath = path.join(__dirname,"../client/bookmy-show/build")
app.use(express.static(clientBuildPath))
app.get("*", (req, res) =>
    res.sendFile(path.join(_dirname, "/client/bookmy-show/build/index.html"))
  );

// console.log(__dirname)

app.listen(process.env.PORT,()=>{

    console.log("server is running on port 8000")
})