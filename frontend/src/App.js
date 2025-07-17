import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import BookOrder from './pages/BookOrder'
import Navbar from './components/Navbar'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import SelectedList from './pages/SelectedList'


const App = () => {

  const [user, setUser] = React.useState({
    email: "",
    name: "",
    phone:"",
    usertype: "0"
  })

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/book-order' element={<BookOrder />} />
        <Route path='/login' element={<Signin setUser={setUser}/>} />
        <Route path='/register' element={<Signup />} />
        <Route path='/forgot-password'element={<ForgotPassword/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/selectedList' element={<SelectedList />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App