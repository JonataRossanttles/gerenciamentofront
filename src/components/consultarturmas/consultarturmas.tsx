

import { useEffect, useRef, useState } from 'react';
import './consultarturmas.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import Modal_consultar_turma from '../modalconsultarturmas/modalconsultarturmas.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Consultarturmas() {
const {rotacriarturma} = usarcontextoapi();
const {statusmodal,setStatusmodal} = usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const turma = useRef<HTMLInputElement>(null);
const serie = useRef<HTMLInputElement>(null);
const turno = useRef<HTMLInputElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const sala = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()



async function consultar_turma(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!anoLetivo.current)  return
   
  const dados = {
    anoLetivo: Number(anoLetivo.current.value),
  };
try {
  setLoading(true)
  const response = await fetch(rotacriarturma, {
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
console.log(information.msg)
setLoading(false)
setStatusresponse(true);
setStatusreq(information.msg);
setStatusmsgerro(false);
 
 // Limpar os campos do formulário após o cadastro
 if (divresponse.current) {
   divresponse.current.classList.remove('erroresponse');
   divresponse.current.classList.add('sucessoresponse');
 }
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

function abrir_modal(){
setStatusmodal(true)
console.log('clicked')
}

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
          <tr className='line-table'>
            <td className='information-table'>Turma A</td>
            <td className='information-table'>1º ano</td>
            <td className='information-table'>Manhã</td>
            <td className='information-table'>205</td>
            <td className='information-table'>2025</td>
             <td className='information-table'><img alt='Icone de visualização' src='/icon-ver.png' className='icon-ver' onClick={abrir_modal}></img></td>
          </tr>
         <tr className='line-table' >
            <td className='information-table'>Turma B</td>
            <td className='information-table'>2º ano</td>
            <td className='information-table'>Tarde</td>
              <td className='information-table'>101</td>
              <td className='information-table'>2025</td>
            <td className='information-table'><img src='/icon-ver.png' className='icon-ver' onClick={abrir_modal}></img></td>
          </tr>
          
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
