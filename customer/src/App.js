import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import BookOrder from './pages/BookOrder'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Registration from './pages/Registration'
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
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/contact' element={<Contact />} />
         <Route path='/selectedList' element={<SelectedList />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App