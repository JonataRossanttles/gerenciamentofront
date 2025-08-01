

import './header.css'
import { usarcontexto } from '../../context/context'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function Header() {
  const path = useLocation().pathname;
  const { informationmenu,useinformationmenu } = usarcontexto();
 useEffect(()=>{
 if(path === "/adm/cadastrar-turma")  useinformationmenu("Cadastrar Turma")
 if(path === "/adm/cadastrar-aluno")  useinformationmenu("Cadastrar Aluno")
 if(path === "/adm/cadastrar-usuario")  useinformationmenu("Cadastrar Usuário")
 if(path === "/adm/cadastrar-disciplina")  useinformationmenu("Cadastrar Disciplina")
 if(path === "/adm/consultar-turmas")  useinformationmenu("Consultar Turmas")
 if(path === "/adm/consultar-alunos")  useinformationmenu("Consultar Alunos")
 if(path === "/adm/consultar-usuarios")  useinformationmenu("Consultar Usuários")
 if(path === "/adm/consultar-disciplinas")  useinformationmenu("Consultar Disciplinas")
 if(path === "/adm/consultar-alunos-na-turma")  useinformationmenu("Consultar Alunos na turma")
 if(path === "/adm/consultar-professores-na-turma")  useinformationmenu("Consultar Professores na turma")
 if(path === "/adm/consultar-disciplinas-na-turma")  useinformationmenu("Consultar Disciplinas na turma")
 if(path === "/adm/consultar-situacao-cadastral-alunos")  useinformationmenu("Consultar Situação academica dos alunos")
 if(path === "/adm")  useinformationmenu("Início")
 },[path])
  return (
    <>
    <div className="container-header">
      <h2 className='text-header'>{informationmenu}</h2>
    
  </div>
   
    </>
  )
}

export default Header
