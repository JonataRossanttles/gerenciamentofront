
import { useEffect, useRef } from 'react'
import './menu.css'
import { usarcontexto } from '../../context/context'

function Menu() {
  const { useinformationmenu } = usarcontexto();
  useEffect(()=>{useinformationmenu('Inicio')},[])

  const refs = {
    divcadastro: useRef<HTMLDivElement>(null),
    divconsulta: useRef<HTMLDivElement>(null),
    diviconcadastro: useRef<HTMLImageElement>(null),
    diviconconsulta: useRef<HTMLImageElement>(null),
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

function infooption (e: React.MouseEvent<HTMLDivElement>) {
  const target = e.target as HTMLElement;
  const divOption = target.closest('.div-option');
  if (divOption) {
    divOption.classList.add('option-selected');
    const span = divOption.querySelector('span');
    if (span) {
      useinformationmenu(span.textContent);
    }
}}

  return (
    <>
    <div className='container-geral-menu'>
      <img  src='/logo.png' alt='logo' className='logo'></img>
      <div className='container-option-principal'>
        <div className='option-principal' >
          <div className='container-icon-option'>
            <img src='/home.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Inicio</span>
          </div>
        </div>
        <div className='option-principal' onClick={togglecadastro}>
          <div className='container-icon-option'>
            <img src='/icon-cadastro.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Cadastrar</span>
          </div>
          <img src='/seta-down.png' alt='icon-setinha' className='icon-open-options' ref={refs.diviconcadastro}></img>
        </div>
        <div className='container-options'  ref={refs.divcadastro}>
        <div className='div-option' onClick={infooption}><span className='text-option' >Turma</span></div>
        <div className='div-option' onClick={infooption}><span className='text-option'>Aluno</span></div>
        <div className='div-option' onClick={infooption}><span className='text-option' >Usuário</span></div>
        <div className='div-option' onClick={infooption}><span className='text-option'>Disciplina</span></div>
        <div className='div-option' onClick={infooption}><span className='text-option'>Alunos na turma</span></div>
        <div className='div-option' onClick={infooption}><span className='text-option'>Professor(a)s na turma</span></div>
        <div className='div-option' onClick={infooption}><span className='text-option'>Disciplinas na turma</span></div>
      </div>

      <div className='option-principal' onClick={toggleconsulta}>
          <div className='container-icon-option'>
            <img src='/icon-consulta.png' alt='home' className='icon-option'></img>
            <span className='text-option-principal' >Consultar</span>
          </div>
          <img src='/seta-down.png' alt='icon-setinha' className='icon-open-options' ref={refs.diviconconsulta} /> 
        </div>
        <div className='container-options'  ref={refs.divconsulta}>
        <div className='div-option' onClick={infooption} ><span className='text-option'>Alunos na turma</span></div>
        <div className='div-option' onClick={infooption} ><span className='text-option'>Professor(a)s na turma</span></div>
        <div className='div-option' onClick={infooption} ><span className='text-option' >Disciplinas na turma</span></div>
        <div className='div-option' onClick={infooption} ><span className='text-option'>Situação cadastral - Alunos</span></div>
      </div>
      </div>
      

    </div>
    </>
  )
}

export default Menu
