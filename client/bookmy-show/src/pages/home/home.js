import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { GetAllMovies } from "../../calls/movies"
import MovieList from "../../Components/MovieList/MovieList";
import NavBar from "../../Components/NavBar/NavBar";
import { Input,Row,Col, Flex } from "antd";

 import moment from "moment";
function Home(){
  const [movies,setMovies] = useState(null)
  const [searchText, setSearchtext] = useState("");


  const navigate = useNavigate()
  const fetchMovies = async ()=>{

    const response = await GetAllMovies();
    console.log(response)
 setMovies(response.data.data)
}   

useEffect(()=>{
    fetchMovies();
},[])

const onSearchInputChange = (e)=>{
setSearchtext(e.target.value)
}

return <div >
  {/* <NavBar/> */}
  <NavBar/>
  <Row style={{justifyContent:"center", marginTop:"10px"}} className="d-flex  w-100">
    <Col  lg={{span:12}} xs={{span:24}}>

    <Input value={searchText} onChange={onSearchInputChange} placeholder="type here to search for movies"/>
    </Col>
  </Row>

<Flex wrap gap="middle" justify="center" align="center" style={{marginTop:"10px",padding:"20px"}}>
 

    {
      movies && 
      movies.filter((movie)=>
        movie.movieName.toLowerCase().includes(searchText.toLowerCase()))
      .map((movie)=>{
        return <div  className="mb-5"

        span={
          {
            lg:10,
            xs:24,
            md:12
          }
        }

        >
        <div className="text-center">
          <img width={250} src={movie.poster} style={{borderRadius:"8px"}}/>
          <h3 className="cursor-pointer" onClick={()=>{ 
         navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)
          }}>{movie.movieName}</h3>
        </div>
        
        </div>
      })
    }

 
  </Flex>
  {/* <MovieList/> */}
</div>

}

export default Home