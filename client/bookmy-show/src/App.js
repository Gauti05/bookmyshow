import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/home/home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import '@ant-design/v5-patch-for-react-19';
import SingleMovie from './pages/SingleMovie/SingleMovie';
import BookShow from './pages/BookShow/BookShow';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Reset from './pages/Reset/reset';

function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/movie/:id' element={<SingleMovie/>}/>
      <Route path='/movie/:movieId/book-show/:showId' element={<BookShow/>}/>
      {/* <Route path='/forget' element={<ForgetPassword/>}/> */}
      <Route path='/forget' element={<ForgetPassword/>} />
      <Route path='/reset' element={<Reset/>}/>


     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;
