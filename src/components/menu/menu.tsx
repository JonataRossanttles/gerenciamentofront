
import {useEffect, useRef, useState } from 'react'
import './menu.css'
import { Link, useLocation } from 'react-router-dom';

function Menu() {
  const path = useLocation().pathname;
  const [toogleconsulta, setToogleconsulta] = useState(false);
  const [toogleconsultaicon, setToogleconsultaicon] = useState(false);
  const [tooglecadastrar, setTooglecadastrar] = useState(false);
  const [tooglecadastraricon, setTooglecadastraricon] = useState(false);

  const refs = {
    divcadastro: useRef<HTMLDivElement>(null),
    divconsulta: useRef<HTMLDivElement>(null),
    divconsultaprof: useRef<HTMLDivElement>(null),
    diviconcadastro: useRef<HTMLImageElement>(null),
    diviconconsulta: useRef<HTMLImageElement>(null),
    diviconconsultaprof: useRef<HTMLImageElement>(null),
    divinicio: useRef<HTMLDivElement>(null)
  }
function togglecadastro () {
  
  setTooglecadastrar(!tooglecadastrar);
  setTooglecadastraricon(!tooglecadastraricon);
}

function toggleconsulta () {
  setToogleconsulta(!toogleconsulta);
  setToogleconsultaicon(!toogleconsultaicon);
}

function toggleconsultaprof () {
  if(refs.divconsultaprof.current){
    refs.divconsultaprof.current.classList.toggle("option-show")
    refs.diviconconsultaprof.current?.classList.toggle("icon-options-rotate")
  }
}

function infooption (element:  HTMLDivElement | HTMLAnchorElement) {
  const divOption = element.closest('.div-option') as HTMLElement;

  if (!divOption) return;
  if (divOption) {
    const options = document.querySelectorAll('.div-option');
    const divinicio = refs.divinicio.current;
    options.forEach(option => {
      option.classList.remove('option-selected');
    });
    if(divinicio) {
     divinicio.id = '';
    }
    divOption.classList.add('option-selected');
    // option-selected
}}
useEffect(() => {
 console.log(path)
}, []);



function logoff() {
  console.log('Logoff clicked');
}

useEffect(()=>{
if(path.includes('/adm/cadastrar')){
setTooglecadastrar(true);
setTooglecadastraricon(true);
}
if(path.includes('/adm/consultar')){
setToogleconsulta(true);
  setToogleconsultaicon(true);

 
}},[path])

  return (
    <>
    <div className='container-geral-menu'>
      <img  src='/logo.png' alt='logo' className='logo'></img>
     
      <div className='container-option-principal'>
        <Link to={'/adm'}  className='link-option-principal'>
          <div   ref={refs.divinicio}  className= {path === '/adm' ? 'div-inicio' : 'option-principal'}  >
            <div className='container-icon-option' >
              <img src='/home.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Inicio</span>
          </div>
          </div>
        </Link>
       
        <div className='option-principal' onClick={togglecadastro}>
          <div className='container-icon-option'>
            <img src='/icon-cadastro.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Cadastrar</span>
          </div>
          <img src='/seta-down.png' alt='icon-setinha' className= {tooglecadastraricon ? 'icon-options-rotate' :  'icon-open-options'}  ref={refs.diviconcadastro}></img>
        </div>
        <div className={tooglecadastrar ? 'option-show'  :  'container-options'}  ref={refs.divcadastro}>
      <Link to={'cadastrar-turma'} className= {path === '/adm/cadastrar-turma' ? 'option-selected' : 'div-option'} ><span className='text-option' id='cadastrar-turma' >Turma</span></Link>  
        <Link to={'cadastrar-aluno'} className={path === '/adm/cadastrar-aluno' ? 'option-selected' : 'div-option'} ><span className='text-option'>Aluno</span></Link>
        <Link to={'cadastrar-usuario'} className={path === '/adm/cadastrar-usuario' ? 'option-selected' : 'div-option'} ><span className='text-option' >Usuário</span></Link>
        <Link to={'cadastrar-disciplina'} className={path === '/adm/cadastrar-disciplina' ? 'option-selected' : 'div-option'} ><span className='text-option'>Disciplina</span></Link>
        <Link to={'cadastrar-alunos-na-turma'} className= {path === '/adm/cadastrar-alunos-na-turma' ? 'option-selected' : 'div-option'}><span className='text-option'>Alunos na turma</span></Link>
       <Link to={'cadastrar-professores-na-turma'} className= {path === '/adm/cadastrar-professores-na-turma' ? 'option-selected' : 'div-option'}><span className='text-option'>Professor(a)s na turma</span></Link>
       <Link to={'cadastrar-disciplinas-na-turma'} className= {path === '/adm/cadastrar-disciplinas-na-turma' ? 'option-selected' : 'div-option'}><span className='text-option'>Disciplinas na turma</span></Link>
      </div>

      <div className= 'option-principal' onClick={toggleconsulta}>
          <div className='container-icon-option'>
            <img src='/icon-consulta.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Consultar</span>
          </div>
          <img src='/seta-down.png' alt='icon-setinha' className={toogleconsultaicon ? 'icon-options-rotate' :  'icon-open-options' } ref={refs.diviconconsulta} /> 
        </div>
        <div className= {toogleconsulta ? 'option-show'  :  'container-options'}   ref={refs.divconsulta}>
          <Link to={'consultar-turmas'} className= {path === '/adm/consultar-turmas' ? 'option-selected' : 'div-option'}><span className='text-option' >Turmas</span></Link>
       <Link to={'consultar-alunos'} className= {path === '/adm/consultar-alunos' ? 'option-selected' : 'div-option'}><span className='text-option'>Alunos</span></Link>
       <Link to={'consultar-usuarios'} className= {path === '/adm/consultar-usuarios' ? 'option-selected' : 'div-option'}><span className='text-option' >Usuários</span></Link>
       <Link to={'consultar-disciplinas'} className= {path === '/adm/consultar-disciplinas' ? 'option-selected' : 'div-option'}><span className='text-option'>Disciplinas</span></Link>
       <Link to={'consultar-alunos-na-turma'} className= {path === '/adm/consultar-alunos-na-turma' ? 'option-selected' : 'div-option'}><span className='text-option'>Alunos na turma</span></Link>
       <Link to={'consultar-professores-na-turma'} className= {path === '/adm/consultar-professores-na-turma' ? 'option-selected' : 'div-option'}><span className='text-option'>Professor(a)s na turma</span></Link>
       <Link to={'consultar-disciplinas-na-turma'} className= {path === '/adm/consultar-disciplinas-na-turma' ? 'option-selected' : 'div-option'}><span className='text-option'>Disciplinas na turma</span></Link>
      
      </div>

      <div className='option-principal' onClick={toggleconsultaprof} id='visao-prof'>
          <div className='container-icon-option'>
            <img src='/icon-consulta.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Consultar</span>
          </div>
          <img src='/seta-down.png' alt='icon-setinha' className='icon-open-options' ref={refs.diviconconsultaprof} /> 
        </div>
        <div className='container-options'  ref={refs.divconsultaprof} >
        <div className='div-option' onClick={(e) => infooption(e.currentTarget)} ><span className='text-option'>Minhas turmas</span></div>
        <div className='div-option' onClick={(e) => infooption(e.currentTarget)} ><span className='text-option'>Minhas disciplinas</span></div>
      </div>

      </div>
      <div className='option-principal'   onClick={logoff}>
          <div className='container-icon-option' >
            <img src='/exit.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Logoff</span>
          </div>
        </div>

    </div>
    </>
  )
}

export default Menu
