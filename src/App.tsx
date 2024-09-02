import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from '@/pages/Dashboard'
import ProtectRoute from '@/components/ProtectRoute'
import UserList from '@/pages/UserList'
import UserDetail from '@/pages/UserDetail'
import IzinList from '@/pages/IzinList'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import Layout from '@/components/Layout'

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status == 401) {
        Swal.fire({
          title: "Sesi berakhir",
          text: 'Silahkan login ulang',
          icon: 'warning'
        }).then(res => {
          if (res.isConfirmed) {
            navigate('/login');
          }
        })
      }
    })
  }, [navigate])
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Dashboard />} />
        <Route path='user' element={<ProtectRoute allowedUser={[0,1]}><UserList /></ProtectRoute>} />
        <Route path='izin' element={<ProtectRoute allowedUser={[0,1,2]}><IzinList /></ProtectRoute>} />
      </Route>
    </Routes>
  )
}

export default App
