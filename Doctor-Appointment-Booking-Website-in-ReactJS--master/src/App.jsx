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
import DoctorRegistration from './pages/DoctorRegistration'
import PatientRegistration from './pages/PatientRegistration'
import DoctorDashboard from './pages/DoctorDashboard'
import RoleSelection from './pages/RoleSelection'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider } from './context/AuthContext'
import UserManagement from './pages/UserManagement'
import DoctorVerification from './pages/DoctorVerification'
import AdminSettings from './pages/AdminSettings'
import PatientDashboard from './pages/PatientDashboard'
import FindDoctors from './pages/FindDoctors'

const App = () => {
  return (
    <AuthProvider>
      <DoctorsProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/patient" element={<PatientRegistration />} />
            <Route path="/register/doctor" element={<DoctorRegistration />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointement/:docId" element={<Appointment />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/find-doctors" element={<FindDoctors />} />
            <Route path="/select-role" element={<RoleSelection />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="verification" element={<DoctorVerification />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </DoctorsProvider>
    </AuthProvider>
  )
}

export default App
