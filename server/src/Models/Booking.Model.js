const moongoose = require('mongoose')

const bookingSchema = new moongoose.Schema({
    show:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"Shows"

    },
    user:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"Users"  
    },
    seats:{
        type:Array,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    }
})

const BookingModel = moongoose.model("Bookings", bookingSchema)
 
module.exports = BookingModel