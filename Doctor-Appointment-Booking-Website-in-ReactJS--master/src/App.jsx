import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { DoctorsProvider } from './context/DoctorsContext'
import Register from './pages/Register'

const App = () => {
  return (
    <DoctorsProvider>
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register/*' element={<Register/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/doctors/:speciality' element={<Doctors/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/my-profile' element={<MyProfile/>} />
          <Route path='/my-appointments' element={<MyAppointments/>} />
          <Route path='/appointement/:docId' element={<Appointment/>} />
        </Routes>
        <Footer/>
      </div>
    </DoctorsProvider>
  )
}

export default App
