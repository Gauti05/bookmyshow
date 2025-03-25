const BookingModel = require('../Models/Booking.Model');
const showModel = require('../Models/show.model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEYS)

//STRIPE_SECRET_KEYS


const makePayment =async (req,res)=>{
const {token,amount} = req.body;
console.log(token)
console.log(amount)

try{
    const customer = await  stripe.customers.create({
        email: token.email,
        source: token.id
    
    })
    
    const paymentIntent =  await stripe.paymentIntents.create({
        customer:customer.id,
        amount:amount,
        currency:"usd",
        payment_method_types : ['card']
    })
    
    const transactionId = paymentIntent.id

    return res.send({
        success:true,
        message:"payment successfull",
        data:transactionId
    })
}

catch(err){

}

}


const createBooking = async(req,res)=>{
const {show,seats,transactionId} = req.body
const userId =  req.userDetails_id;
    

try {
const newBooking = new BookingModel({show,seats,transactionId,user:userId})

const NewBookingrespone =   await newBooking.save()

const showDetails = await showModel.findById(show)
const updatedSeats = [...showDetails.bookedSeats, ...seats]

await showModel.findByIdAndUpdate(show, {bookedSeats:updatedSeats})

return res.send({
    success:true,
    message:`Booking succesfully created with BookingId: ${NewBookingrespone._id}`,
    data:NewBookingrespone
})



    
} catch (err) {
    
}


}

module.exports ={
    makePayment,
    createBooking
}