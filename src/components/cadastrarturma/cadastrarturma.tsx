

import { useEffect, useRef, useState } from 'react';
import './cadastrarturma.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';



function cadastrarturma() {
const {rotacriarturma} = usarcontextoapi();
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

async function cadastrar_turma(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if(!turma.current || !serie.current || !turno.current || !anoLetivo.current || !sala.current) {
    return;
  }
  const dados = {
    turma: turma.current.value,
    serie: serie.current.value,
    turno: turno.current.value,
    anoLetivo: Number(anoLetivo.current.value),
    sala: sala.current.value
  };

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
 setStatusreq(information.msg);
 setStatusresponse(true);
 setStatusmsgerro(true);
 return;
}
setStatusresponse(true);
setStatusreq(information.msg);
setStatusmsgerro(false);
 
 // Limpar os campos do formulário após o cadastro
 if (divresponse.current) {
   divresponse.current.classList.remove('erroresponse');
   divresponse.current.classList.add('sucessoresponse');
 }
 
 // Limpar os campos do formulário
  if (turma.current)
turma.current.value = '';
serie.current.value = '';
turno.current.value = '';
anoLetivo.current.value = '';
sala.current.value = '';
 
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
}, [statusmsgerro]);

function closeresponse() {
  setStatusresponse(false);
  setStatusreq('');
  setStatusmsgerro(false);
}


  return (
    <>
    <section className='main'>
    <form className='form-cadastrar-turma' onSubmit={cadastrar_turma}>
      <div className='container-input'>
        <span className='span-cadastrar-turma'>Turma:</span>
        <input type="text" className='input-cadastrar-turma' ref={turma} />
      </div>
      <div className='container-input'>
        <span className='span-cadastrar-turma'>Série:</span>
        <input type="text" className='input-cadastrar-turma' ref={serie} />
      </div>
      <div className='container-input'>
        <span className='span-cadastrar-turma'>Turno:</span>
        <input type="text" className='input-cadastrar-turma' ref={turno} />
      </div>
      <div className='container-input'>
        <span className='span-cadastrar-turma'>Ano letivo:</span>
        <input type="number" className='input-cadastrar-turma' ref={anoLetivo} />
      </div>
    
      <div className='container-input'>
        <span className='span-cadastrar-turma'>Sala:</span>
        <input type="text" className='input-cadastrar-turma' ref={sala} />
      </div>
      <button className='btn-cadastrar'>Cadastrar</button>

     
    </form>
   </section>
   {statusresponse && (
     <div className='container-response' ref={divresponse}>
       <span className='information-response'>{statusreq}</span>
       <img src='/close.png' className='close-response' onClick={closeresponse}></img>
     </div>
   )}
    </>
  )

}

export default cadastrarturma
