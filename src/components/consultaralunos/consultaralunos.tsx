

import { useEffect, useRef, useState } from 'react';
import './consultaralunos.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';

import { usarcontexto } from '../../context/context.tsx';
import Modal_editar_aluno from '../modaleditaraluno/modaleditaraluno.tsx';
import Modal_confirm from '../modalconfirm/modalconfirm.tsx';


function Consultaralunos() {
const {rotaconsultaralunos,rotaexcluiraluno} = usarcontextoapi();
const {statusmodal,setStatusmodal,arrayConsulta,setArrayconsulta,setSelectionmodal,
  statusmodalconfirm,setStatusmodalconfirm
} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const divresponse = useRef<HTMLDivElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const selectSituacao = useRef<HTMLSelectElement>(null);
const btn_excluir = useRef<HTMLButtonElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [disable,setDisable] = useState<boolean>(false)
const [selectedIds, setSelectedIds] = useState<string[]>([]);
//const [selectedTurmas, setSelectedTurmas] = useState<string[]>([]);
const [selectAll, setSelectAll] = useState<boolean>(false);
const [arrayoriginal , setArrayoriginal] = useState<any[]>([])


async function consultar_alunos() {
   
  const dados = {
    situacao: selectSituacao.current?.value.toUpperCase(),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultaralunos, {
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
 
 setLoading(false)
 setStatusreq(information.msg);
 setStatusresponse(true);
 setStatusmsgerro(true);
 return;
}
setLoading(false) 
if(information.msg.length === 0){
  setLoading(false)
 setStatusreq("Não existem alunos para essa situação escolar!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayconsulta(information.msg)
setArrayoriginal(information.msg)
setDisable(true)
inputFilter.current?.classList.add('input-filtrar-alunos-liberado')


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

function filtraralunos(){
  const nome = inputFilter.current?.value?.toLowerCase() || ''
const arrayfilter = arrayoriginal.filter((element)=>{ return  element.nome.toLowerCase().includes(nome)})
setArrayconsulta(arrayfilter)
}
async function refresh() {
   
  const dados = {
    situacao: selectSituacao.current?.value.toUpperCase(),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultaralunos, {
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
 setLoading(false)
 setStatusreq(information.msg);
 setStatusresponse(true);
 setStatusmsgerro(true);
 return;
}
setLoading(false) 
if(information.msg.length === 0){
  setLoading(false)
 setStatusreq("Não existem alunos para essa situação escolar!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayconsulta(information.msg)
setArrayoriginal(information.msg)
setDisable(true)



} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor!');
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }

async function excluir_aluno() {
    
  const dados = {
    alunosId: selectedIds,

  }
try {
  setLoading(true)
  const response = await fetch(rotaexcluiraluno, {
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
       <form className='form-consultar-alunos' id='form-consultar-alunos' >
        <div className='container-consultar'>
          <div className='container-input-consultar-alunoss'>
          <span className='span-consultar-alunos'>Situação escolar:</span>
          <select className='input-consultar-alunos' defaultValue={""} ref={selectSituacao} onChange={()=>{consultar_alunos()}}>
            <option value="" disabled hidden> Selecione uma opção</option>
            <option value={'ATIVO'}>Ativo</option>
            <option value={'CANCELADO'}>Cancelado</option>
            <option value={'TRANCADO'}>Trancado</option>
            <option value={'ABANDONO'}>Abandono</option>
            <option value={'CONCLUIDO'}>Concluido</option>
            <option value={'PRE-MATRICULADO'}>Pré-matriculado</option>
            <option value={'TODOS'}>Todos</option>
          </select>
     
      </div>
      {/*  <button type='submit' className='btn-consultar'>Consultar</button> */}
        </div>
    
      <div className='container-input-consultar-alunoss' id='filtro-alunos'>
        <span className='span-consultar-alunos' >Filtrar pelo nome do aluno:</span>
        <input type="text" className='input-filtrar-alunos' ref={inputFilter} onChange={filtraralunos} disabled={!disable}  placeholder='Digite o nome do aluno'/>
      </div>
      
      </form>
      <div className='container-button-excluir'>
        <button type='button' className={disable ? 'btn-excluir-liberado' : 'btn-excluir-consultar'} ref={btn_excluir} onClick={()=>{setStatusmodalconfirm(true)}} disabled={!disable}>Excluir aluno(s) </button>
      </div>
        <span className='span-total'>Total de alunos: {arrayConsulta.length}</span>
      <table className='table-consultar'>
        <thead>
        <tr>
           <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th>
        <th className='table-header'>Matrícula</th>
        <th className='table-header'>Nome</th>
        <th className='table-header'>Turma</th>
        <th className='table-header' >Situação escolar</th>
        <th className='table-header' >Responsável</th>       
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
          checked={selectedIds.includes(element.alunoId)}
          onChange={() => mudarcheckbox(element.alunoId)}
          className="checkbox-table-selecionar"
        />
        </td>
            <td className='information-table'>{element.matricula}</td>
            <td className='information-table'>{element.nome}</td>
            <td className='information-table'>{element.dadosturma?.[0]?.turma ?? 'Sem turma'}</td>
            <td className='information-table'>{element.situacao}</td>
            <td className='information-table'>{element.nomeResponsavel}</td>
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
   {statusmodalconfirm && <Modal_confirm excluir={excluir_aluno}/>}
   {loading && <Loading/>}
   {statusmodal &&  <Modal_editar_aluno refresh={refresh}/> } 
    </>
  )

}

export default Consultaralunos
