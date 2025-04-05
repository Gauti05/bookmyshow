
const { makePayment, createBooking } = require("../CONTROLLER/booking.controller")
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middleware")


module.exports = (app)=>{
    app.post("/payment", [verifyToken], makePayment)
    app.post("/bookings", [verifyToken], createBooking)
}

// "build": " npm install && cd ../client/bookmy-show && npm install && npm run build"
    
    