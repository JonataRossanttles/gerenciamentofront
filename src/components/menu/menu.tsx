
import {useEffect, useRef } from 'react'
import './menu.css'
import { Link, useLocation } from 'react-router-dom';

function Menu() {
  const path = useLocation().pathname;
  

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
  if(refs.divcadastro.current){
refs.divcadastro.current.classList.toggle("option-show")
refs.diviconcadastro.current?.classList.toggle("icon-options-rotate")
  }
}

function toggleconsulta () {
  if(refs.divconsulta.current){
    refs.divconsulta.current.classList.toggle("option-show")
    refs.diviconconsulta.current?.classList.toggle("icon-options-rotate")
  }
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
    
}}

function infoinicio(){
  const divinicio = refs.divinicio.current;
  const options = document.querySelectorAll('.div-option');
   options.forEach(option => {
      option.classList.remove('option-selected');
    });

  if (divinicio) {
    divinicio.id = 'div-inicio';
  }
  
}

function logoff() {
  console.log('Logoff clicked');
}

useEffect(()=>{
if(path === '/adm/cadastrar/turma'){
  if(refs.divcadastro.current) {
  infooption(refs.divcadastro.current);
  }
 
}


},[path])

  return (
    <>
    <div className='container-geral-menu'>
      <img  src='/logo.png' alt='logo' className='logo'></img>
     
      <div className='container-option-principal'>
        <Link to={'/adm'}  className='link-option-principal'   onClick={infoinicio} >
          <div   ref={refs.divinicio} className='option-principal' id='div-inicio' onClick={infoinicio}>
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
          <img src='/seta-down.png' alt='icon-setinha' className='icon-open-options' ref={refs.diviconcadastro}></img>
        </div>
        <div className='container-options'  ref={refs.divcadastro}>
      <Link to={'cadastrar-turma'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option' id='cadastrar-turma' >Turma</span></Link>  
        <Link to={'cadastrar-aluno'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Aluno</span></Link>
        <Link to={'cadastrar-usuario'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option' >Usuário</span></Link>
        <Link to={'cadastrar-disciplina'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Disciplina</span></Link>
      </div>

      <div className='option-principal' onClick={toggleconsulta}>
          <div className='container-icon-option'>
            <img src='/icon-consulta.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Consultar</span>
          </div>
          <img src='/seta-down.png' alt='icon-setinha' className='icon-open-options' ref={refs.diviconconsulta} /> 
        </div>
        <div className='container-options'  ref={refs.divconsulta}>
          <Link to={'consultar-turmas'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option' >Turmas</span></Link>
       <Link to={'consultar-alunos'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Alunos</span></Link>
       <Link to={'consultar-usuarios'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option' >Usuários</span></Link>
       <Link to={'consultar-disciplinas'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Disciplinas</span></Link>
       <Link to={'consultar-alunos-na-turma'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Alunos na turma</span></Link>
       <Link to={'consultar-professores-na-turma'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Professor(a)s na turma</span></Link>
       <Link to={'consultar-disciplinas-na-turma'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Disciplinas na turma</span></Link>
       <Link to={'consultar-situacao-cadastral-alunos'} className='div-option' onClick={(e) => infooption(e.currentTarget)}><span className='text-option'>Situação cadastral - Alunos</span></Link>
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
