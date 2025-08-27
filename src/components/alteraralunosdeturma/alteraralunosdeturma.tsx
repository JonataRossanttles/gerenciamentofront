

import { useEffect, useRef, useState } from 'react';
import './alteraralunosdeturma.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';



function Alterar_alunos_de_turma() {
const {rotaconsultarturmas,rotaconsultar_turma_alunos,rotaalterar_alunos_de_turma} = usarcontextoapi();
const {arrayConsulta,setArrayconsulta} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const divresponse = useRef<HTMLDivElement>(null);
const inputTurmaorigem = useRef<HTMLSelectElement>(null);
const inputTurmadestino = useRef<HTMLSelectElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [disable,setDisable] = useState<boolean>(false)
const [arrayoriginal , setArrayoriginal] = useState<any[]>([])
const [turmas, setTurmas] = useState<React.ReactElement[]>([])
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const [selectAll, setSelectAll] = useState<boolean>(false);

async function consultar_turmas() {

   const dados = {
    anoLetivo:new Date().getFullYear(),
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
 setStatusreq("Não existem Turmas para esse período letivo");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setTurmas(information.msg.map((element:any)=>{
  return(
    <option key={element.turmaId} value={element.turmaId}>{element.turma}</option>
  )
}))

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }

async function consultar_alunos() {
   const dados = {
    turmaId: inputTurmaorigem.current?.value
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultar_turma_alunos, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },body: JSON.stringify({
    dados:dados}),
  credentials: 'include'
})
const information = await response.json();
console.log(information)
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
 setStatusreq("Todos os alunos estão enturmados!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayconsulta(information.msg[0].dadosalunos)
setArrayoriginal(information.msg[0].dadosalunos)
setDisable(true)

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
 setStatusresponse(true);
 setStatusmsgerro(true);
}
 
  }

 async function alterar_alunos_na_turma() {

   const dados = {
    turmaorigemId:inputTurmaorigem.current?.value,
    turmadestinoId:inputTurmadestino.current?.value,
    alunosId: selectedIds
  };
try {
  setLoading(true)
  const response = await fetch(rotaalterar_alunos_de_turma, {
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
consultar_alunos();

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

function filtraralunos(){
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
  const arrayId = arrayConsulta.map((element:any)=>element.alunoId)
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
  consultar_turmas()
},[])

  return (
    <>
    <section className='main'>
       <form className='form-consultar-alunos' id='form-consultar-alunos' onSubmit={consultar_turmas}>
        <div className='container-alterar'>

           <div className='container-input-turmas-alterar' id='container-input-alterar1'>
          <span className='span-consultar-alunos'>Turma de origem:</span>
          <select className='input-select-turma-origem-liberado' defaultValue={""} onChange={consultar_alunos}  ref={inputTurmaorigem} >
            <option value="" disabled hidden> Selecione uma turma...</option>
            {turmas}
          </select>
      </div>
          <img src="/seta-de-para.png" alt="Seta" className='seta-alterar'></img>
           <div className='container-input-turmas-alterar'>
          <span className='span-consultar-alunos'>Turma de destino:</span>
          <select className={disable ? 'input-select-turma-origem-liberado' : 'input-select-turma-origem'} defaultValue={""} disabled={!disable}  ref={inputTurmadestino} >
            <option value="" disabled hidden> Selecione uma turma...</option>
            {turmas}
          </select>
      </div>
         
        </div>

        
      <div className='container-input-consultar-alunos' id='filtro-alunos'>

        <span className='span-consultar-alunos' >Filtrar pelo nome do aluno:</span>
        <input type="text" className={disable ? 'input-filtrar-alunos-liberado' : 'input-filtrar-alunos'} ref={inputFilter} onChange={filtraralunos} disabled={!disable}  placeholder='Digite o nome do aluno'/>
      </div>
      <button type='button' className='btn-cadastrar' id='btn-cadastrar-alunos-na-turma' onClick={alterar_alunos_na_turma}>Alterar alunos de turma</button>
      </form>
     
      <table className='table-consultar'>
         
        <thead>
        <tr>
         <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th>
        <th className='table-header'>Matrícula</th>
        <th className='table-header'>Aluno</th>
             
        </tr>
        </thead>
        <tbody>
          {arrayConsulta.map((element: any) => (
    <tr key={element.alunoId} className="line-table">
      <td className="information-table">
        <input
          type="checkbox"
          checked={selectedIds.includes(element.alunoId)}
          onChange={() => mudarcheckbox(element.alunoId)}
          className="checkbox-selecionar-aluno"
        />
      </td>
      <td className="information-table">{element.matricula}</td>
      <td className="information-table">{element.nome}</td>
    
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

export default Alterar_alunos_de_turma
