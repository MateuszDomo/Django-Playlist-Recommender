import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import ProtectedRoute from './routes/ProtectedRoute'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <div>
      {/* <nav style={{ padding: '1rem' }}>
        <Link to="/">Home</Link>{' '}
      </nav> */}
      <Routes>
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
