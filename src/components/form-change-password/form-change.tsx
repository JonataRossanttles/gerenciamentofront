import { useRef, useState,useEffect } from 'react';

import './form-change.css'
import Loading from '../loading/loading';
import { usarcontextoapi } from '../../context/contextapi';

function Formchangepassword() {

const {rotachangepassword}= usarcontextoapi()
 const divresponse = useRef<HTMLDivElement>(null);
  const [statusresponse, setStatusresponse] = useState<boolean>(false); 
  const [msgreq, setmsgreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro,setstatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const emailref = useRef<HTMLInputElement>(null);

const [statusloading,setStatusloading] = useState<boolean>(false)


  const enviar = async (e:any)=>{
   e.preventDefault();
   setStatusloading(true)
   const email = emailref.current?.value.toLowerCase();
   if(!email){
   
      setStatusloading(false)
      setStatusresponse(true)
      setstatusmsgerro(true)
      setmsgreq('Por favor, preencha o seu E-mail.')
      return;
   }
   
   try {
     const resposta = await  fetch(rotachangepassword,{method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({email:email})
    
    })
    const dados = await resposta.json()
    if(!resposta.ok) {
     setStatusloading(false)
      setStatusresponse(true)
      setstatusmsgerro(true)
      setmsgreq(`${dados.msg}`)
      return  
    }
    setStatusloading(false)
    setStatusresponse(true)
    setstatusmsgerro(false)
    setmsgreq(`${dados.msg} Acesse o seu e-mail para troca de senha.`)
    if(emailref.current) emailref.current.value = ''
    return 
   } catch (error) {
     setStatusloading(false)
    setStatusresponse(true)
    setmsgreq('Erro no servidor!')
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
   setmsgreq('');
  
 }

  return (
    <>
    <div className='container-change-password'>
       <form className='form-change-password' onSubmit={enviar}>
        <h2 className='title-change-password'>Digite seu E-mail cadastrado </h2>
        <div className='container-input-change-password'>
          <input type="email" placeholder="E-mail" className='input-change-password'  ref={emailref} />
          <button type="submit" className='button-change-password'>Enviar</button> 
  
        </div>
      </form>
    </div>
    {statusloading && <Loading/> }
    {statusresponse && (
     <div className='container-response' ref={divresponse}>
       <span className='information-response'>{msgreq}</span>
       <img src='/close.png' className='close-response' onClick={closeresponse}></img>
     </div>
   )}
    
     
    </>
  )
}

export default Formchangepassword
