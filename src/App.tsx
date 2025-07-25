
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Login from './pages/login/login'
import Geral from './pages/geral/geral'
import Cadastrarturma from './components/cadastrarturma/cadastrarturma'

function App() {

  return (
    <>
 
 <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/adm' element={<Geral />}>
          {/* <Route index element={<Cadastrarturma />} /> */}
          <Route path='cadastrar-turma' element={<Cadastrarturma />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
