import { useEffect, useRef, useState } from 'react';
import './modalconsultarturmas.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Modal_consultar_turma() {
const {rotaconsultarturmas} = usarcontextoapi();
const {setStatusmodal}=usarcontexto()
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



async function editar_turma(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!anoLetivo.current)  return
   
  const dados = {
    anoLetivo: Number(anoLetivo.current.value),
  };
try {
  setLoading(true)
  const response = await fetch(rotaconsultarturmas, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body:JSON.stringify({dados})
})
const information = await response.json();

if(response.status === 401) {
 navigate('/login');
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

function closemodal() {
setStatusmodal(false)
 
}


  return (
    <>
    <div className='modal'>
   
   
    <form className='form-modal-turma' onSubmit={editar_turma}>
      <img src='/close.png' alt='fechar' className='close' onClick={closemodal}></img>
      <div className='container-input'>
        <span className='span-modal-turma'>Turma:</span>
        <input type="text" className='input-modal-turma' ref={turma} disabled />
      </div>
      <div className='container-input'>
        <span className='span-modal-turma'>Série:</span>
        <input type="text" className='input-modal-turma' ref={serie} disabled />
      </div>
      <div className='container-input'>
        <span className='span-modal-turma'>Turno:</span>
        <input type="text" className='input-modal-turma' ref={turno} disabled />
      </div>
      <div className='container-input'>
        <span className='span-modal-turma'>Ano letivo:</span>
        <input type="number" className='input-modal-turma' ref={anoLetivo} disabled/>
      </div>
    
      <div className='container-input'>
        <span className='span-modal-turma'>Sala:</span>
        <input type="text" className='input-modal-turma' ref={sala}disabled />
      </div>
      <button className='btn-modal'>Atualizar</button>

    </form>


   {statusresponse && (
     <div className='container-response' ref={divresponse}>
       <span className='information-response'>{statusreq}</span>
       <img src='/close.png' className='close-response' onClick={closeresponse}></img>
     </div>
   )}
   {loading && <Loading/>}
    </div>  
    </>
  )

}

export default Modal_consultar_turma
