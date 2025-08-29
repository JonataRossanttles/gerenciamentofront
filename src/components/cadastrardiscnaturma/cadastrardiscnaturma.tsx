

import { useEffect, useRef, useState } from 'react';
import './cadastrardiscnaturma.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';




function Cadastrar_disciplinas_na_turma() {
const {rotaconsultardisciplinas,rotaconsultarturmas,rotacriar_disciplinas_na_turma} = usarcontextoapi();
const {arrayConsulta,setArrayconsulta} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const divresponse = useRef<HTMLDivElement>(null);
const inputTurma = useRef<HTMLSelectElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [disable,setDisable] = useState<boolean>(false)
const [arrayoriginal , setArrayoriginal] = useState<any[]>([])
const [turmas, setTurmas] = useState<React.ReactElement[]>([])
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
   
try {
  setLoading(true)
  const response = await fetch(rotaconsultardisciplinas, {
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
 setStatusreq("Sem disciplinas para esse período letivo!");
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

 async function cadastrar_disciplinas_na_turma() {

   const dados = {
    turmaId:inputTurma.current?.value,
    disciplinasId: selectedIds
  };
try {
  setLoading(true)
  const response = await fetch(rotacriar_disciplinas_na_turma, {
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
consultar_disciplinas();

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

function filtrardisciplinas(){
  const codigo = inputFilter.current?.value?.toLowerCase() || ''

 if(codigo.trim() === ''){
  setArrayconsulta(arrayoriginal)
 }else{
  const arrayfilter = arrayoriginal.filter((element)=>  element.codigo.toLowerCase().includes(codigo))
  setArrayconsulta(arrayfilter)
 }



}

function selecionarTudo(){

if(selectAll){
  setSelectedIds([])
  setSelectAll(false)
}else{
  setSelectAll(true)
  const arrayId = arrayConsulta.map((element:any)=>element.discId)
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
  consultar_disciplinas()

},[])

  return (
    <>
    <section className='main'>
       <form className='form-consultar-disciplinas' id='form-consultar-disciplinas' onSubmit={consultar_turmas}>
        <div className='container-consultar'>
          <div className='container-input-consultar-disciplinas'>
          <span className='span-consultar-disciplinas'>Ano letivo:</span>
          <input type='number' min={0} className='input-consultar-disciplinas' placeholder='Digite um ano letivo' defaultValue={""} ref={anoLetivo}/>
         
      </div>
      <button type='submit' className='btn-consultar'>Consultar</button>
        </div>

        <div className='container-input-turmas'>
          <span className='span-consultar-disciplinas'>Em qual turma deseja incluir as disciplinas?</span>
          <select className={disable ? 'input-select-turmas-liberado' : 'input-select-turma'} defaultValue={""} disabled={!disable} ref={inputTurma} >
            <option value="" disabled hidden> Selecione uma turma...</option>
            {turmas}
          </select>
      </div>
      <div className='container-input-consultar-disciplinas' id='filtro-disciplinas'>

        <span className='span-consultar-disciplinas' >Filtrar pelo código da disciplina:</span>
        <input type="text" className={disable ? 'input-filtrar-disciplinas-liberado' : 'input-filtrar-disciplinas'} ref={inputFilter} onChange={filtrardisciplinas} disabled={!disable}  placeholder='Digite o código da disciplina'/>
      </div>
      <button type='button' className='btn-cadastrar' id='btn-cadastrar-disciplinas-na-turma' onClick={cadastrar_disciplinas_na_turma}>Cadastrar disciplinas na turma</button>
      </form>
     
      <table className='table-consultar'>
         
        <thead>
        <tr>
         <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th>
        <th className='table-header'>Código</th>
        <th className='table-header'>Disciplina</th>
             
        </tr>
        </thead>
        <tbody>
          {arrayConsulta.map((element: any) => (
    <tr key={element.alunoId} className="line-table">
      <td className="information-table">
        <input
          type="checkbox"
          checked={selectedIds.includes(element.discId)}
          onChange={() => mudarcheckbox(element.discId)}
          className="checkbox-selecionar-aluno"
        />
      </td>
      <td className="information-table">{element.codigo}</td>
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

export default Cadastrar_disciplinas_na_turma
