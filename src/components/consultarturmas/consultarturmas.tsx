

import { use, useEffect, useRef, useState } from 'react';
import './consultarturmas.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import {  useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import Modal_consultar_turma from '../modaleditarturma/modaleditarturma.tsx';
import { usarcontexto } from '../../context/context.tsx';
import Modal_confirm from '../modalconfirm/modalconfirm.tsx';


function Consultarturmas() {
const {rotaconsultarturmas,rotaexcluirturma} = usarcontextoapi();

const {statusmodal,setStatusmodal,setSelectionmodal,arrayConsulta,setArrayconsulta,
  statusmodalconfirm,setStatusmodalconfirm,infouser} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const anoLetivo = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const btn_excluir = useRef<HTMLButtonElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [disable,setDisable] = useState<boolean>(false)
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const [selectAll, setSelectAll] = useState<boolean>(false);
const [arrayoriginal , setArrayoriginal] = useState<any[]>([])



async function consultar_turma(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!anoLetivo.current)  return
   
  const dados = {
    anoLetivo: Number(anoLetivo.current.value),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultarturmas, {
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
 setStatusreq("Não existem turmas para esse ano letivo!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayoriginal(information.msg)
setArrayconsulta(information.msg)
setDisable(true)



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

function filtrarturmas(){
  const turma = inputFilter.current?.value?.toLowerCase() || ''

if(turma.trim() === ''){
  setArrayconsulta(arrayoriginal)
 }else{
  const arrayfilter = arrayoriginal.filter((element)=>  element.turma.toLowerCase().includes(turma))
  setArrayconsulta(arrayfilter)
 }

}
async function refresh() {
 
  if (!anoLetivo.current)  return
   
  const dados = {
    anoLetivo: Number(anoLetivo.current.value),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultarturmas, {
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
 setStatusreq("Não existem turmas para esse ano letivo!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayoriginal(information.msg)
setArrayconsulta(information.msg)

setDisable(true)
inputFilter.current?.classList.add('input-filtrar-turma-liberado')


} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor!');
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }
async function excluir_turma() {
     
  const dados = {
    turmaId: selectedIds
  }
try {
  setLoading(true)
  const response = await fetch(rotaexcluirturma, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body:JSON.stringify({dados})
})
const information = await response.json();

if(response.status === 401) {
 navigate('/');
 return;
}
if(!response.ok){
 setLoading(false)
 setStatusreq(information.msg);
 setStatusresponse(true);
 setStatusmsgerro(true);

 return;
}
setLoading(false)
setStatusresponse(true);
setStatusreq(information.msg);
setStatusmsgerro(false);
setStatusmodalconfirm(false)
refresh()

 if (divresponse.current) {
   divresponse.current.classList.remove('erroresponse');
   divresponse.current.classList.add('sucessoresponse');
 }

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor!');
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }
function selecionarTudo(){
  
if(selectAll){
  setSelectedIds([])
  setSelectAll(false)
}else{
  const arrayId = arrayConsulta.map((element:any)=>element.turmaId)
  setSelectedIds(arrayId)
  setSelectAll(true)
}


}
function mudarcheckbox (id:string){
  if (selectedIds.includes(id)) {
    setSelectedIds(selectedIds.filter(item => item !== id));
  } else {
    setSelectedIds([...selectedIds, id]);
  }
}

useEffect(()=>{
  setArrayconsulta([])
 
},[])



  return (
    <>
    <section className='main'>
       <form className='form-consultar-turma' id='form-consultar-turma' onSubmit={consultar_turma}>
        <div className='container-consultar'>
          <div className='container-input-consultar-turmas'>
          <span className='span-consultar-turma'>Ano letivo:</span>
          <input type="number" min={0} className='input-consultar-turma' ref={anoLetivo} placeholder='Digite o ano letivo'/>
      </div>
      <button className='btn-consultar'>Consultar</button>
        </div>
    
      <div className='container-input-consultar-turmas' id='filtro-turma'>
        <span className='span-consultar-turma' >Filtrar pelo nome da turma:</span>
        <input type="text" className={disable ? 'input-filtrar-turma-liberado' : 'input-filtrar-turma'} ref={inputFilter} onChange={filtrarturmas} disabled={!disable}  placeholder='Digite o nome da turma'/>
      </div>
      
      </form>
       {infouser === "admin" &&  <div className='container-button-excluir'>
        <button type='button' className={disable ? 'btn-excluir-liberado' : 'btn-excluir-consultar'} ref={btn_excluir} onClick={()=>{setStatusmodalconfirm(true)}} disabled={!disable}>Excluir turma(s) </button>
      </div>} 
      
      <table className='table-consultar'>
        <thead>
        <tr>
          <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th>
        <th className='table-header'>Nome</th>
        <th className='table-header'>Série</th>
        <th className='table-header' >Turno</th>
        <th className='table-header' >Sala</th>
        <th className='table-header' >Ano letivo</th>
        <th className='table-header' >Detalhes</th>
        
        </tr>
        </thead>
        <tbody>
       {arrayConsulta.map((element:any)=>{
        
      return(
      
      <tr className='line-table'>
       <td className="information-table">
        <input
          type="checkbox"
          checked={selectedIds.includes(element.turmaId)}
          onChange={() => mudarcheckbox(element.turmaId)}
          className="checkbox-table-selecionar"
        />
        </td>
            <td className='information-table'>{element.turma}</td>
            <td className='information-table'>{element.serie}</td>
            <td className='information-table'>{element.turno}</td>
            <td className='information-table'>{element.sala}</td>
            <td className='information-table'>{element.anoLetivo}</td>
             <td className='information-table'>
              <div className='container-icon-detalhes'>
               <img alt='Icone de visualização' src='/icon-ver.png' className='icon-ver' onClick={()=>{setSelectionmodal(element)
              setStatusmodal(true)
             }} ></img>
            
              </div>

             </td>
      </tr>
             )
})}
          
        </tbody>
      </table>
   </section>
   {statusresponse && (
     <div className='container-response' ref={divresponse}>
       <span className='information-response'>{statusreq}</span>
       <img src='/close.png' className='close-response' onClick={closeresponse}></img>
     </div>
   )}
   {statusmodalconfirm && <Modal_confirm excluir={excluir_turma}/>}
   {loading && <Loading/>}
   {statusmodal &&  <Modal_consultar_turma/> } 
    </>
  )

}

export default Consultarturmas
