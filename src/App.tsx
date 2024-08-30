import './App.css'
import { Link, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<h1>Hai</h1>} />
      <Route path='/login' element={<div><h1>Login</h1><Link to='/'>Login</Link></div>}/>
    </Routes>
  )
}

export default App
