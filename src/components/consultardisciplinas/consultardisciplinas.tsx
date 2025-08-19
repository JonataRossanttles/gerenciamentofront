

import { useEffect, useRef, useState } from 'react';
import './consultardisciplinas.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';

import { usarcontexto } from '../../context/context.tsx';
import Modal_confirm from '../modalconfirm/modalconfirm.tsx';
import Modal_editar_disciplina from '../modaleditardisciplina/modaleditardisciplina.tsx';


function Consultardisciplinas() {
const {rotaconsultardisciplinas,rotaexcluirdisciplina} = usarcontextoapi();
const {statusmodal,setStatusmodal,Selectionmodal,setSelectionmodal,arrayConsulta,setArrayconsulta,
  statusmodalconfirm,setStatusmodalconfirm} = usarcontexto()
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
const [tabeladisciplina , setTabeladisciplina] = useState<React.ReactElement[]>([])
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const [selectAll, setSelectAll] = useState<boolean>(false);
const [arrayoriginal , setArrayoriginal] = useState<any[]>([])

async function consultar_disciplina(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!anoLetivo.current)  return
   
  const dados = {
    anoLetivo: Number(anoLetivo.current.value),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultardisciplinas, {
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
 setStatusreq("Não existem disciplinas para esse ano letivo!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayconsulta(information.msg)
setArrayoriginal(information.msg)

setDisable(true)
inputFilter.current?.classList.add('input-filtrar-disciplina-liberado')


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

function filtrardisciplinas(){
  const disciplina = inputFilter.current?.value?.toLowerCase() || ''
const arrayfilter = arrayoriginal.filter((element)=>{ return  element.nome.toLowerCase().includes(disciplina)})
setArrayconsulta(arrayfilter)

}
async function refresh() {

  if (!anoLetivo.current)  return
   
  const dados = {
    anoLetivo: Number(anoLetivo.current.value),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultardisciplinas, {
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
 setStatusreq("Não existem disciplinas para esse ano letivo!");
 setStatusresponse(true);
 setStatusmsgerro(true);
}

setArrayconsulta(information.msg)
setArrayoriginal(information.msg)

setDisable(true)
inputFilter.current?.classList.add('input-filtrar-disciplina-liberado')


} catch (error) {
  setLoading(false)
  setStatusreq('Erro no servidor!');
 setStatusresponse(true);
 setStatusmsgerro(true);
}

}

async function excluir_disciplina() {
    
  const dados = {
    discId: selectedIds
  }
try {
  setLoading(true)
  const response = await fetch(rotaexcluirdisciplina, {
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
  const arrayId = arrayConsulta.map((element:any)=>element.discId)
  setSelectedIds(arrayId)
  setSelectAll(true)
}


}
function mudarcheckbox (id:string){
  console.log(id)
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
       <form className='form-consultar-disciplina' id='form-consultar-disciplina' onSubmit={consultar_disciplina}>
        <div className='container-consultar'>
          <div className='container-input-consultar-disciplinas'>
          <span className='span-consultar-disciplina'>Ano letivo:</span>
          <input type="number" min={0} className='input-consultar-disciplina' ref={anoLetivo} placeholder='Digite o ano letivo'/>
      </div>
      <button className='btn-consultar'>Consultar</button>
        </div>
    
      <div className='container-input-consultar-disciplinas' id='filtro-disciplina'>
        <span className='span-consultar-disciplina' >Filtrar pelo nome da disciplina:</span>
        <input type="text" className='input-filtrar-disciplina' ref={inputFilter} onChange={filtrardisciplinas} disabled={!disable}  placeholder='Digite o nome da disciplina'/>
      </div>
      
      </form>
       <div className='container-button-excluir'>
        <button type='button' className={disable ? 'btn-excluir-liberado' : 'btn-excluir-consultar'} ref={btn_excluir} onClick={()=>{setStatusmodalconfirm(true)}} disabled={!disable}>Excluir turma(s) </button>
      </div>
      <table className='table-consultar'>
        <thead>
        <tr>
         <th className='table-header'><input type="checkbox" checked={selectAll} className='checkbox-selecionar-todos' onChange={selecionarTudo}/></th> 
        <th className='table-header'>Código</th>
        <th className='table-header'>Nome</th>
        <th className='table-header' >Carga Horária</th>
        <th className='table-header' >Descrição</th>        
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
          checked={selectedIds.includes(element.discId)}
          onChange={() => mudarcheckbox(element.discId)}
          className="checkbox-table-selecionar"
        />
        </td>
            <td className='information-table'>{element.codigo}</td>
            <td className='information-table'>{element.nome}</td>
            <td className='information-table'>{element.cargaHoraria}</td>
            <td className='information-table' title={element.descricao}>{element.descricao}</td>
             <td className='information-table'>
              <div className='container-icon-detalhes'>
               <img alt='Icone de visualização' src='/icon-ver.png' className='icon-ver' onClick={()=>{setSelectionmodal(element)
              setStatusmodal(true)
             }} ></img>
              </div>

             </td>
      </tr>
             )})}
        </tbody>
      </table>
   </section>
   {statusresponse && (
     <div className='container-response' ref={divresponse}>
       <span className='information-response'>{statusreq}</span>
       <img src='/close.png' className='close-response' onClick={closeresponse}></img>
     </div>
   )}
   {statusmodalconfirm && <Modal_confirm excluir={excluir_disciplina}/>}
   {loading && <Loading/>}
   {statusmodal &&  <Modal_editar_disciplina/> } 
    </>
  )

}

export default Consultardisciplinas
