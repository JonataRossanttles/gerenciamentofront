

import { useEffect, useRef, useState } from 'react';
import './cadastrarprofnaturma.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Cadastrar_professores_na_turma() {
const {rotaconsultar_professores,rotaconsultarturmas,rotacriar_turma_disciplina_professores,
rotaconsultar_turma_disciplinas
} = usarcontextoapi();
const {arrayConsulta,setArrayconsulta} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const divresponse = useRef<HTMLDivElement>(null);
const inputTurma = useRef<HTMLSelectElement>(null);
const inputDisciplina = useRef<HTMLSelectElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [disable,setDisable] = useState<boolean>(false)
const [arrayoriginal , setArrayoriginal] = useState<any[]>([])
const [turmas, setTurmas] = useState<React.ReactElement[]>([])
const [disciplinas, setDisciplinas] = useState<React.ReactElement[]>([])
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const [selectAll, setSelectAll] = useState<boolean>(false);

async function consultar_turmas(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
   const dados = {
    anoLetivo:anoLetivo.current?.value,
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

 setLoading(false)
 setStatusreq(information.msg);
 setStatusresponse(true);
 setStatusmsgerro(true);
 return;
}
setLoading(false) 
if(information.msg.length === 0){
  setLoading(false)
 setStatusreq("Não existem Turmas para esse período letivo");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setTurmas(information.msg.map((element:any)=>{
  return(
    <option key={element.turmaId} value={element.turmaId}>{element.turma}</option>
  )
}))

setDisable(true)
inputTurma.current?.classList.add('input-select-turmas-liberado')

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }
async function consultar_disciplinas() {

   const dados = {
    turmaId:inputTurma.current?.value
  };

try {
  setLoading(true)
  const response = await fetch(rotaconsultar_turma_disciplinas, {
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
 setStatusreq("Não existem disciplinas para essa turma");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setDisciplinas(information.msg[0].dadosdisciplinas.map((element:any)=>{
  return(
    <option key={element.discId} value={element.discId}>{element.nome}</option>
  )
}))


} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }

async function consultar_professores() {
   
try {
  setLoading(true)
  const response = await fetch(rotaconsultar_professores, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
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
 setStatusreq("Sem professores para esse período letivo!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayconsulta(information.msg)
setArrayoriginal(information.msg)

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }

 async function cadastrar_professores_na_turma() {

   const dados = {
    turmaId:inputTurma.current?.value,
    professoresId: selectedIds,
    disciplinaId:inputDisciplina.current?.value,
    anoLetivo:Number(anoLetivo.current?.value)
  };

try {
  setLoading(true)
  const response = await fetch(rotacriar_turma_disciplina_professores, {
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
 setStatusreq("Erro ao cadastrar!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setLoading(false)
setStatusresponse(true);
setStatusreq(information.msg);
setStatusmsgerro(false);
setDisable(true)
setSelectedIds([])
setSelectAll(false)

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
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

function filtrarprofessores(){
  const nome = inputFilter.current?.value?.toLowerCase() || ''

 if(nome.trim() === ''){
  setArrayconsulta(arrayoriginal)
 }else{
  const arrayfilter = arrayoriginal.filter((element)=>  element.nome.toLowerCase().includes(nome))
  setArrayconsulta(arrayfilter)
 }



}

function selecionarTudo(){
  
if(selectAll){
  setSelectedIds([])
  setSelectAll(false)
}else{
  setSelectAll(true)
  const arrayId = arrayConsulta.map((element:any)=>element.userId)
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
  consultar_professores()

},[])

  return (
    <>
    <section className='main'>
       <form className='form-consultar-professores' id='form-consultar-professores' onSubmit={consultar_turmas}>
        <div className='container-consultar'>
          <div className='container-input-consultar-professores'>
          <span className='span-consultar-professores'>Ano letivo:</span>
          <input type='number' min={0} className='input-consultar-professores' placeholder='Digite um ano letivo' defaultValue={""} ref={anoLetivo}/>
         
      </div>
      <button type='submit' className='btn-consultar'>Consultar</button>
        </div>

        <div className='container-input-turmas'>
          <span className='span-consultar-professores'>Em qual turma deseja incluir os professores?</span>
          <select className={disable ? 'input-select-turmas-liberado' : 'input-select-turma'} defaultValue={""} disabled={!disable} ref={inputTurma} onChange={consultar_disciplinas}>
            <option value="" disabled hidden> Selecione uma turma...</option>
            {turmas}
          </select>
      </div>
      <div className='container-input-turmas'>
          <span className='span-consultar-professores'>Qual disciplina ele irá lecionar na turma selecionada?</span>
          <select className={disable ? 'input-select-turmas-liberado' : 'input-select-turma'} defaultValue={""} disabled={!disable} ref={inputDisciplina} >
            <option value="" disabled hidden> Selecione uma disciplina...</option>
            {disciplinas}
          </select>
      </div>


      <div className='container-input-consultar-professores' id='filtro-professores'>

        <span className='span-consultar-professores' >Filtrar pelo nome do professor:</span>
        <input type="text" className={disable ? 'input-filtrar-professores-liberado' : 'input-filtrar-professores'} ref={inputFilter} onChange={filtrarprofessores} disabled={!disable}  placeholder='Digite o nome do professor'/>
      </div>
      <button type='button' className='btn-cadastrar' id='btn-cadastrar-professores-na-turma' onClick={cadastrar_professores_na_turma}>Cadastrar professores na turma</button>
      </form>
     
      <table className='table-consultar'>
         
        <thead>
        <tr>
         <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th>
        <th className='table-header'>Professor</th>
        <th className='table-header'>Email</th>
             
        </tr>
        </thead>
        <tbody>
          {arrayConsulta.map((element: any) => (
    <tr key={element.alunoId} className="line-table">
      <td className="information-table">
        <input
          type="checkbox"
          checked={selectedIds.includes(element.userId)}
          onChange={() => mudarcheckbox(element.userId)}
          className="checkbox-selecionar-aluno"
        />
      </td>
      <td className="information-table">{element.nome}</td>
      <td className="information-table">{element.email}</td>
    
    </tr>
  ))}
          
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

    </>
  )

}

export default Cadastrar_professores_na_turma
