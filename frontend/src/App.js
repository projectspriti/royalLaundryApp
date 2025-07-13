import React from 'react'
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
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/book-order' element={<BookOrder />} />
        <Route path='/login' element={<Signin />} />
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