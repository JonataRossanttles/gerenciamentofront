

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
