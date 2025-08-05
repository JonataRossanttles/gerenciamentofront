

import { useEffect, useRef, useState } from 'react';
import './consultarturmas.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import Modal_consultar_turma from '../modalconsultarturmas/modalconsultarturmas.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Consultarturmas() {
const {rotaconsultarturmas} = usarcontextoapi();
const {statusmodal,setStatusmodal,turmaSelecionada,setTurmaselecionada,arrayTurmas,setArrayturmas} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const turma = useRef<HTMLInputElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [tabelaturma , setTabelaturma] = useState<[]>([])

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
 navigate('/login');
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

const arrayturmas = information.msg.map((element:any)=>{
  return(
    <tr className='line-table'>
            <td className='information-table'>{element.turma}</td>
            <td className='information-table'>{element.serie}</td>
            <td className='information-table'>{element.turno}</td>
            <td className='information-table'>{element.sala}</td>
            <td className='information-table'>{element.anoLetivo}</td>
             <td className='information-table'><img alt='Icone de visualização' src='/icon-ver.png' className='icon-ver' id={element.turmaId} onClick={(e) => abrir_modal(e.currentTarget.id)} ></img></td>
      </tr>
             )
})
setTabelaturma(arrayturmas)
setArrayturmas(information.msg)
console.log(information.msg)
 // Limpar os campos do formulário
anoLetivo.current.value = '';
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

function abrir_modal(id: string){
  console.log(id)
setStatusmodal(true)
const turmaselecionada =  arrayTurmas.find((element) => element.turmaId === id)
console.log(turmaselecionada)
setTurmaselecionada(turmaselecionada)
}
useEffect(()=>{
console.log(arrayTurmas)
},[arrayTurmas])


  return (
    <>
    <section className='main'>
       <form className='form-consultar-turma' id='form-consultar-turma' onSubmit={consultar_turma}>
        <div className='container-consultar'>
          <div className='container-input-consultar-turmas'>
          <span className='span-consultar-turma'>Ano letivo:</span>
          <input type="number" className='input-consultar-turma' ref={anoLetivo} placeholder='Digite o ano letivo'/>
      </div>
      <button className='btn-consultar'>Consultar</button>
        </div>
    
      <div className='container-input-consultar-turmas' id='filtro-turma'>
        <span className='span-consultar-turma'>Filtrar pelo nome da turma:</span>
        <input type="number" className='input-consultar-turma' disabled ref={turma} placeholder='Digite o nome da turma'/>
      </div>
      
      </form>
      <table className='table-consultar'>
        <thead>
        <tr>
        <th className='table-header'>Nome</th>
        <th className='table-header'>Série</th>
        <th className='table-header' >Turno</th>
        <th className='table-header' >Sala</th>
        <th className='table-header' >Ano letivo</th>
        <th className='table-header' >Detalhe</th>
        
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

export default Consultarturmas
