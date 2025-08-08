
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import Consultarturmas from './components/consultarturmas/consultarturmas'
import Consultaralunos from './components/consultaralunos/consultaralunos'


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
          <Route path='consultar-turmas' element={<Consultarturmas/>}/>
          <Route path='consultar-alunos' element={<Consultaralunos/>}/>
          <Route path='consultar-usuarios' element={<h1>Consultar Usuários</h1>}/>
          <Route path='consultar-disciplinas' element={<h1>Consultar Disciplinas</h1>}/>
          <Route path='consultar-alunos-na-turma' element={<h1>Consultar Alunos na turma</h1>}/>
          <Route path='consultar-professores-na-turma' element={<h1>Consultar professores na turma</h1>}/>
          <Route path='consultar-disciplinas-na-turma' element={<h1>Consultar disciplinas na turma</h1>}/>
          <Route path='consultar-situacao-cadastral-alunos' element={<h1>Consultar situação cadastral dos alunos</h1>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
