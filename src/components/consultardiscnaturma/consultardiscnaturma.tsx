

import { useEffect, useRef, useState } from 'react';
import './consultardiscnaturma.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';

import { usarcontexto } from '../../context/context.tsx';

import Modal_confirm from '../modalconfirm/modalconfirm.tsx';
import Modal_editar_disciplina from '../modaleditardisciplina/modaleditardisciplina.tsx';



function Consultar_disc_na_turma() {
const {rotaconsultar_turma_disciplinas,rotaexcluir_turma_disciplinas,rotaconsultarturmas} = usarcontextoapi();
const {statusmodal,setStatusmodal,arrayConsulta,setArrayconsulta,setSelectionmodal,
  statusmodalconfirm,setStatusmodalconfirm,infouser
} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const divresponse = useRef<HTMLDivElement>(null);
const inputTurmas = useRef<HTMLSelectElement>(null);
const inputFilter = useRef<HTMLInputElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const btn_excluir = useRef<HTMLButtonElement>(null);
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

setDisable(true)

inputTurmas.current?.classList.add('input-select-turmas-liberado')


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

function filtrardisc(){
  const nome = inputFilter.current?.value?.toLowerCase() || ''

 if(nome.trim() === ''){
  setArrayconsulta(arrayoriginal)
 }else{
  const arrayfilter = arrayoriginal.filter((element)=>  element.nome.toLowerCase().includes(nome))
  setArrayconsulta(arrayfilter)
 }

}
async function turma_select() {
  setSelectAll(false)
    const dados = {
    turmaId:inputTurmas.current?.value,
    anoLetivo:anoLetivo.current?.value
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
 setStatusreq("Não existem disciplinas para essa turma!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}
console.log(information.msg)

if(infouser === 'admin'){
  setArrayoriginal(information.msg[0].dadosdisciplinas)
  setArrayconsulta(information.msg[0].dadosdisciplinas)

}
setArrayoriginal(information.msg.map((element: any) => element.dadosdisciplinas[0]))
setArrayconsulta(information.msg.map((element: any) => element.dadosdisciplinas[0]))

setDisable(true)
inputFilter.current?.classList.add('input-filtrar-disc-liberado')
inputTurmas.current?.classList.add('input-select-turmas-liberado')

} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor! ' + error);
 setStatusresponse(true);
 setStatusmsgerro(true);
}
  }
async function excluir_disc_na_turma() {
    
  const dados = {
    discId: selectedIds,
    turmaId: inputTurmas.current?.value
  }
try {
  setLoading(true)
  const response = await fetch(rotaexcluir_turma_disciplinas, {
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
 turma_select()
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
  setArrayconsulta([])

},[])

  return (
    <>
    <section className='main'>
       <form className='form-consultar-disc' id='form-consultar-disc' onSubmit={consultar_turmas}>
        <div className='container-consultar'>
          <div className='container-input-consultar-disc'>
          <span className='span-consultar-disc'>Ano letivo:</span>
          <input type='number' min={0} className='input-consultar-disc' placeholder='Digite um ano letivo' defaultValue={""} ref={anoLetivo}/>
         
      </div>
      <button type='submit' className='btn-consultar'>Consultar</button>
        </div>

        <div className='container-input-turmas'>
          <span className='span-consultar-disc'>Turmas:</span>
          <select className={disable ? 'input-select-turmas-liberado' : 'input-select-turma'} defaultValue={""} disabled={!disable} ref={inputTurmas} onChange={turma_select}>
            <option value="" disabled hidden> Selecione uma turma...</option>
            {turmas}
          </select>
      </div>
      <div className='container-input-consultar-disc' id='filtro-disc'>

        <span className='span-consultar-disc' >Filtrar pelo nome da disciplina:</span>
        <input type="text" className={disable ? 'input-filtrar-disc-liberado' : 'input-filtrar-disc'} ref={inputFilter} onChange={filtrardisc} disabled={!disable}  placeholder='Digite o nome da disciplina'/>
      </div>
     
      </form>
      {infouser === "admin" &&  <div className='container-button-excluir'>
        <button type='button' className={disable ? 'btn-excluir-liberado' : 'btn-excluir-consultar'} ref={btn_excluir} onClick={()=>{setStatusmodalconfirm(true)}} disabled={!disable}>Retirar disciplina(s) da turma </button>
      </div>} 
      

      <table className='table-consultar'>
         
        <thead>
        <tr>
        {infouser === "admin" && <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th>}
        <th className='table-header'>Código</th>
        <th className='table-header'>Nome</th>
        <th className='table-header' >Carga Horária</th>      
        <th className='table-header' >Descrição</th>      
       {infouser === "admin" && <th className='table-header' >Detalhes</th>}       
        </tr>
        </thead>
        <tbody>
       
            {arrayConsulta.map((element: any) => (
              <tr key={element.alunoId} className="line-table">
              {infouser === "admin" &&  <td className="information-table">
                  <input
                    type="checkbox"
          checked={selectedIds.includes(element.discId)}
          onChange={() => mudarcheckbox(element.discId)}
          className="checkbox-selecionar-aluno"
        />
      </td>}
      <td className="information-table">{element.codigo}</td>
      <td className="information-table">{element.nome}</td>
      <td className="information-table">{element.cargaHoraria}</td>
      <td className="information-table">{element.descricao}</td>
     {infouser === "admin" &&  <td className="information-table">
        <div className="container-icon-detalhes">
          <img
            alt="Icone de visualização"
            src="/icon-ver.png"
            className="icon-ver"
            onClick={() => {
              setSelectionmodal(element);
              setStatusmodal(true);
            }}
          />
        </div>
      </td>}
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
   {statusmodalconfirm && <Modal_confirm excluir={excluir_disc_na_turma}/>}
   {loading && <Loading/>}
   {statusmodal &&  <Modal_editar_disciplina/> }
    </>
  )

}

export default Consultar_disc_na_turma
