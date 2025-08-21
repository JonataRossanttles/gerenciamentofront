
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
import Consultarusuarios from './components/consultarusuarios/consultarusuarios'
import Consultardisciplinas from './components/consultardisciplinas/consultardisciplinas'
import Consultar_alunos_na_turma from './components/consultaralunosnaturma/consultaralunosnaturma'
import Consultar_prof_na_turma from './components/consultarprofnaturma/consultarprofnaturma'
import Consultar_disc_na_turma from './components/consultardiscnaturma/consultardiscnaturma'
import Cadastrar_alunos_na_turma from './components/cadastraralunosnaturma/cadastraralunosnaturma'


function App() {
const {authenticated} = usarcontexto()

  return (
    <>
 
 <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/change-password' element={<Changepassword/>} />
        <Route path='/resetpassword/:token' element={<Resetpassword/>} />
        <Route path='/adm' element={<Rotaprivada authenticated={authenticated} />}>
         <Route element={<Geral />}> 
          <Route index element={<Inicio />} />
          <Route path='cadastrar-turma' element={ <Cadastrarturma />  } />
          <Route path='cadastrar-aluno' element={<Cadastraraluno />} />
          <Route path='cadastrar-usuario' element={<Cadastrarusuario/>}/>
          <Route path='cadastrar-disciplina' element={<Cadastrardisciplina/>}/>
           <Route path='cadastrar-alunos-na-turma' element={<Cadastrar_alunos_na_turma/>}/>
          <Route path='cadastrar-professores-na-turma' element={<h1>Cadastrar Professores na turma</h1>}/>
          <Route path='cadastrar-disciplinas-na-turma' element={<h1>Cadastrar Disciplinas na turma</h1>}/>
          <Route path='consultar-turmas' element={<Consultarturmas/>}/>
          <Route path='consultar-alunos' element={<Consultaralunos/>}/>
          <Route path='consultar-usuarios' element={<Consultarusuarios/>}/>
          <Route path='consultar-disciplinas' element={<Consultardisciplinas/>}/>
          <Route path='consultar-alunos-na-turma' element={<Consultar_alunos_na_turma/>}/>
          <Route path='consultar-professores-na-turma' element={<Consultar_prof_na_turma/>}/>
          <Route path='consultar-disciplinas-na-turma' element={<Consultar_disc_na_turma/>}/>
          
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
