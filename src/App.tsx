import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from '@/pages/Dashboard'
import ProtectRoute from '@/components/ProtectRoute'
import UserList from '@/pages/UserList'
import UserDetail from '@/pages/UserDetail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectRoute allowedUserLevel={[0, 1]} />}>
          <Route path='' element={<Dashboard />} />
          <Route path='user' element={<UserList />}>
            <Route path=':id' element={<UserDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
