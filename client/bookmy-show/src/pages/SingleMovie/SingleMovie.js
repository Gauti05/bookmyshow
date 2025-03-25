import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllMovieById } from "../../calls/movies";
import Navbar from "../../Components/NavBar/NavBar";
import { Input,Row,Col, Flex } from "antd";
import moment from "moment"
import { GetShowsForMovie } from "../../calls/shows";

function SingleMovie(){

    const [movie,setMovie] = useState(null)
    const [date,SetDate] = useState(moment().format("YYYY-MM-DD"))
    const [showsData,setShows] = useState(null);

    const navigate = useNavigate(null)

const getData  = async()=>{
  const movieres = await  GetAllMovieById(params.id)
  setMovie(movieres.data.data)
}

const handleDate = (e)=>{
SetDate(e.target.value)
 navigate(`/movie/${params.id}?date=${e.target.value}`)
}

const getAllShowsForSelectedMovies = async() =>{
    console.log(`get shows for movieId: ${params.id} and date:${date}`)
    const showsData = await GetShowsForMovie(params.id,date)
    setShows(showsData.data.data)
    console.log(showsData)
}

const params = useParams();

useEffect(() =>{
getAllShowsForSelectedMovies()
},[date])

useEffect(()=>{

    getData()
},[])


console.log(params.id)
return(
    <div>
    <Navbar/>

    {
        movie && (
            <Flex gap="large" justify="center" align="center">
            
           <div>
            <img src={movie.poster} width={200}/>
           </div>

           <div>
            <h1>{movie.movieName}</h1>
            <p>Language:{movie.language}</p>
            <p>Genre:{movie.genre}</p>
            <p>ReleaseDate:{movie.releaseDate}</p>
            <p>Duration:{movie.duration}</p>
            <hr/>
            <div>
                <label>Choose The Date:</label>
                <Input onChange={handleDate} type="date" value={date}/>
            </div>
           </div>

            </Flex>
        )
    }

{
            showsData && showsData.length===0 && (

                <div className="pt-3 m-5">

                    <h2 className="blue-clr"> 
                        Currently, No Theatres available for this movie!
                    </h2>
                </div>

            )
        }

        {
            showsData && showsData.length>0 && (
                <div className="m-3">
<h2>Theatres</h2>

{
    showsData.map(showsData =>{
        const theatreId = showsData.theatreId;
        const theatreDetails = showsData.theatreDetails;
        const allShowsForThisTheatre = showsData.allShowsForParticularTheatre;

        return <div>
            <Row gutter={24}>
<Col lg={{span:8}}>
<h3> {theatreDetails.name} </h3>
<p>{theatreDetails.address}</p>
</Col>
<Col lg={{span:16}}>
<ul className="show-ul">
    {
        allShowsForThisTheatre.map(singleShow=>{
            return <li onClick={()=>{
                navigate(`book-show/${singleShow._id}`)
            }}>{singleShow.time}</li>
        })
    }
</ul>
</Col>
            </Row>
        </div>
        
    })
}
                </div>
            )
        }

    </div>
)
}


export default SingleMovie;

