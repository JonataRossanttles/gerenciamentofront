

import { useEffect, useRef, useState } from 'react';
import './consultarusuarios.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import Modal_consultar_turma from '../modaleditarturma/modaleditarturma.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Consultarusuarios() {
const {rotaconsultarusuarios} = usarcontextoapi();
const {statusmodal,setStatusmodal,setSelectionmodal,arrayConsulta,setArrayconsulta} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const selectStatus = useRef<HTMLSelectElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [disable,setDisable] = useState<boolean>(false)
const [tabelaturma , setTabelaturma] = useState<React.ReactElement[]>([])

async function consultar_turma(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!selectStatus.current)  return
   
  const dados = {
    status: selectStatus.current.value
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultarusuarios, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    dados:dados})
})
const information = await response.json();

if(response.status === 401) {
 navigate('/');
 return;
}
if(!response.ok){
 console.log(information.msg)
 setLoading(false)
 setStatusreq(information.msg);
 setStatusresponse(true);
 setStatusmsgerro(true);
 return;
}
setLoading(false) 
if(information.msg.length === 0){
  setLoading(false)
 setStatusreq("Não existem usuarios para esse ano letivo!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

const arrayusuariosraw = information.msg
setArrayconsulta(arrayusuariosraw)
setTabelaturma(arrayusuariosraw.map((element:any)=>{
  return(
    <tr className='line-table'>
            <td className='information-table'>{element.nome}</td>
            <td className='information-table'>{element.email}</td>
            <td className='information-table'>{element.tipo}</td>
            <td className='information-table'>{element.status ? "ATIVO" : "INATIVO"}</td>
             <td className='information-table'><img alt='Icone de visualização' src='/icon-ver.png' className='icon-ver' id={element.turmaId} onClick={()=>{setSelectionmodal(element)
              setStatusmodal(true)
             }} ></img></td>
      </tr>
             )
}))
setDisable(true)
inputFilter.current?.classList.add('input-filtrar-turma-liberado')


} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor!');
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }
// Adicionando a cor a div de resposta com base no status da mensagem de erro
  useEffect(() => {
 if(statusmsgerro && divresponse.current) {
   divresponse.current.classList.add('erroresponse');
   divresponse.current.classList.remove('sucessoresponse');
 }else{
    divresponse.current?.classList.remove('erroresponse');
    divresponse.current?.classList.add('sucessoresponse');
 }
}, [statusmsgerro, statusresponse]);

function closeresponse() {
  setStatusresponse(false);
  setStatusreq('');
 
}

function filtrarusuarios(){
  const turma = inputFilter.current?.value?.toLowerCase() || ''
const arrayfilter = arrayConsulta.filter((element)=>{ return  element.turma.toLowerCase().includes(turma)})
setTabelaturma(arrayfilter.map((element:any)=>{
  return(
    <tr className='line-table'>
             <td className='information-table'>{element.nome}</td>
            <td className='information-table'>{element.email}</td>
            <td className='information-table'>{element.tipo}</td>
            <td className='information-table'>{element.status ? "ATIVO" : "INATIVO" }</td>
             <td className='information-table'><img alt='Icone de visualização' src='/icon-ver.png' className='icon-ver' id={element.turmaId} onClick={()=>{setSelectionmodal(element)
              setStatusmodal(true)
             }} ></img></td>
      </tr>
             )
}))

}

  return (
    <>
    <section className='main'>
       <form className='form-consultar-turma' id='form-consultar-turma' onSubmit={consultar_turma}>
        <div className='container-consultar'>
          <div className='container-input-consultar-usuarios'>
          <span className='span-consultar-turma'>Ano letivo:</span>
          <select className='input-consultar-alunos' defaultValue={""} ref={selectStatus}>
            <option value="" disabled hidden> Selecione uma opção</option>
            <option value={'ativo'}>Ativo</option>
            <option value={'inativo'}>Inativo</option>           
            <option value={'todos'}>Todos</option>
          </select>
      </div>
      <button className='btn-consultar'>Consultar</button>
        </div>
    
      <div className='container-input-consultar-usuarios' id='filtro-turma'>
        <span className='span-consultar-turma' >Filtrar pelo nome da turma:</span>
        <input type="text" className='input-filtrar-turma' ref={inputFilter} onChange={filtrarusuarios} disabled={!disable}  placeholder='Digite o nome da turma'/>
      </div>
      
      </form>
      <table className='table-consultar'>
        <thead>
        <tr>
        <th className='table-header'>Nome</th>
        <th className='table-header'>Email</th>
        <th className='table-header' >Tipo</th>
        <th className='table-header' >Status</th>
        <th className='table-header' >Detalhes</th>
        
        </tr>
        </thead>
        <tbody>
          {tabelaturma}
          
        </tbody>
      </table>
   </section>
   {statusresponse && (
     <div className='container-response' ref={divresponse}>
       <span className='information-response'>{statusreq}</span>
       <img src='/close.png' className='close-response' onClick={closeresponse}></img>
     </div>
   )}
   {loading && <Loading/>}
   {statusmodal &&  <Modal_consultar_turma/> } 
    </>
  )

}

export default Consultarusuarios
