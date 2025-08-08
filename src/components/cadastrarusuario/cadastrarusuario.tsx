

import { useEffect, useRef, useState } from 'react';
import './cadastrarusuario.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';



function Cadastrarusuario() {
const {rotacriarusuario} = usarcontextoapi();
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const nome = useRef<HTMLInputElement>(null);
const email = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const tipo = useRef<HTMLSelectElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()


async function cadastrar_usuario(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if(!nome.current || !email.current || !tipo.current ) {
    return;
  }
  const dados = {
    nome: nome.current.value,
    email: email.current.value,
    tipo: tipo.current.value,
   
  };
try {
  setLoading(true)
  const response = await fetch(rotacriarusuario, {
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
setStatusresponse(true);
setStatusreq(information.msg);
setStatusmsgerro(false);
 
 // Limpar os campos do formulário após o cadastro
 if (divresponse.current) {
   divresponse.current.classList.remove('erroresponse');
   divresponse.current.classList.add('sucessoresponse');
 }
 // Limpar os campos do formulário
nome.current.value = '';
email.current.value = '';
tipo.current.value = '';
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


  return (
    <>
    <section className='main'>
    <form className='form-cadastrar-usuario' onSubmit={cadastrar_usuario}>
      <div className='container-input'>
        <span className='span-cadastrar-usuario'>Nome:</span>
        <input type="text" className='input-cadastrar-usuario' ref={nome} placeholder='Digite o nome'/>
      </div>
      <div className='container-input'>
        <span className='span-cadastrar-usuario'>E-mail:</span>
        <input type="email" className='input-cadastrar-usuario' ref={email} placeholder='Digite o E-mail'/>
      </div>
      <div className='container-input'>
         <span className='span-cadastrar-usuario'>Tipo:</span>
        <select className='input-cadastrar-usuario' ref={tipo} defaultValue="">
            <option value="" disabled selected hidden style={{ color: '#888' }}>Selecione o tipo</option>
            <option value="admin">Administrador</option>
            <option value="prof">Professor</option>
            
          </select>
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
   {loading && <Loading/>}
    </>
  )

}

export default Cadastrarusuario
