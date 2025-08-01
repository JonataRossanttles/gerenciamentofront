
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import  Login from './pages/login/login'
import Geral from './pages/geral/geral'
import Cadastrarturma from './components/cadastrarturma/cadastrarturma'
import Cadastraraluno from './components/cadastraraluno/cadastraraluno'
import Inicio from './components/inicio/inicio'
import Rotaprivada from './components/rotaprivada/rotaprivada'
import { usarcontexto } from './context/context'
import Cadastrarusuario from './components/cadastrarusuario/cadastrarusuario'
import Changepassword from './pages/changepassword/changepassword'
import Resetpassword from './pages/resetpassword/resetpassword'
import Cadastrardisciplina from './components/cadastrardisciplina/cadastrardisciplina'


function App() {
const {authenticated} = usarcontexto()

  return (
    <>
 
 <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/change-password' element={<Changepassword/>} />
        <Route path='/resetpassword/:token' element={<Resetpassword/>} />
        <Route path='/adm' element={<Rotaprivada authenticated={authenticated} />}>
         <Route element={<Geral />}> 
          <Route index element={<Inicio />} />
          <Route path='cadastrar-turma' element={ <Cadastrarturma />  } />
          <Route path='cadastrar-aluno' element={<Cadastraraluno />} />
          <Route path='cadastrar-usuario' element={<Cadastrarusuario/>}/>
          <Route path='cadastrar-disciplina' element={<Cadastrardisciplina/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
