
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Login from './pages/login/login'
import Geral from './pages/geral/geral'

function App() {

  return (
    <>
 
 <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/adm' element={<Geral />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
