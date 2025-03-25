import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { GetShowsDetailsById } from "../../calls/shows";
import { Button, Card, Col, message, Row } from "antd";
import Navbar from "../../Components/NavBar/NavBar";
import StripeCheckout from "react-stripe-checkout"
// import { makePayment } from "../../../../../server/src/CONTROLLER/booking.controller";
import { CreateBooking, MakePayment } from "../../calls/bookings";


function BookShow(){
    const navigate = useNavigate()
    const params = useParams();
    const showId = params.showId
    const[showDetails,setShowDetails] = useState(null)
    const[selectedSeat, SetSelectedSeat] = useState([]);

    const getSeats = ()=>{
       const columns = 12;
       const totalSeats = 120;

       const rows = totalSeats/columns

       let allrows = [];
       for(let i = 0; i<rows; i++){
        allrows.push(i);
       }

       let allcol = [];
       for(let j = 0; j<columns; j++){
        allcol.push(j)
       }

       const handleSeatselect = (seatNumber)=>{
seatNumber = seatNumber.toString();
if(showDetails.bookedSeats.includes(seatNumber)){
    return;
}

if(!selectedSeat.includes(seatNumber)){
    SetSelectedSeat([...selectedSeat,seatNumber]);
    return
}

const updatedSelectedSeat = selectedSeat.filter((seat) => seat!=seatNumber)
SetSelectedSeat(updatedSelectedSeat)

       }




return <div className="seat-ul">
    <div>
    {
        allrows.map((row)=>{
            return <div className="d-flex">
                
{
    allcol.map((col) =>{
        let seatNumber = row*columns+col+1
       const isSeatBooked = showDetails.bookedSeats.includes(seatNumber.toString())
       console.log(isSeatBooked)
       let seatClass = "seat-btn"

if(isSeatBooked){
    seatClass += " seat-btn-booked"
}

if(selectedSeat.includes(seatNumber.toString())){
    seatClass += " seat-btn-selected"
}

        return <button onClick={()=> handleSeatselect(seatNumber)} className={seatClass}>
            {seatNumber}
        </button>
    })
}

                </div>
        })
    }
    </div>


    <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeat.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeat.length * showDetails.ticketPrice}</span>
          </div>
        </div>

</div>



    }

    const onToken = async(token)=>{
        try {
            
            const response = await MakePayment({amount:selectedSeat.length * showDetails.ticketPrice,

                token:token
            })
           if(response.data.success){
            message.success(response.data.message)
//create a new booking

const bookingResponse = await CreateBooking({showId:showDetails._id, seats:[...selectedSeat], 
    transactionId :response.data.data
})

if(bookingResponse.data.success){
    message.success(bookingResponse.data.message)
    navigate("/")
}


           }
           
        } 
        
        catch (err) {
            
        }
    }

    const fetchShowData = async()=>{
try {

    const response = await GetShowsDetailsById(showId);
    setShowDetails(response.data.data)
} 
catch (error) {
    
}
    }

    useEffect(()=> {
fetchShowData();
    }, [])
    
return <> 

<Navbar/> {
showDetails && <div>
    <Row gutter={24}>
<Col span={24}>

<Card title ={
    
    <div>
    
        <h1>{showDetails.movie.movieName}</h1>
        <p>
            Theatre:{showDetails.theatre.name}, {showDetails.theatre.address}
        </p>
        
    </div>


}

extra = {
    <>
    <div>
        <h3>Show Name : {showDetails.name}</h3>
    </div>

<h4>
    Ticket Price : {showDetails.ticketPrice}
</h4>

<h4>
    Total Seats : {showDetails.totalSeats}
</h4>
<h4>
    Available Seats : {showDetails.totalSeats -  showDetails.bookedSeats.length}
</h4>



    </>
}
style={{width:"100%"}}

> 
{getSeats()}


{
    selectedSeat.length>0 &&
    <StripeCheckout 
    token={onToken}
    stripeKey="pk_test_51R2onDQcaqkYsK3bWuwISa7fONKckG2edv38nGpPHrc8KamkW1D9iaNzvvSsigc4zZeecycpfaiccjuIT2QWb1Hc001lnuRhMf"/>
}


</Card>
</Col>
    </Row>
</div>
}
</>
}


export default BookShow;