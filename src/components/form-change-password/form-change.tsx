import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './form-change.css'
import Loading from '../loading/loading';
import { usarcontextoapi } from '../../context/contextapi';

function Formchange() {
const navigate = useNavigate()
const {rotachangepassword}= usarcontextoapi()
const emailref = useRef<HTMLInputElement>(null);
const [statusErro, setStatusErro] = useState<boolean>(false);
const [textErro, setTextErro] = useState<string>('');
const [statusloading,setStatusloading] = useState<boolean>(false)


  const enviar = async (e:any)=>{
   e.preventDefault();
   setStatusloading(true)
   const email = emailref.current?.value.toLowerCase();
   if(!email){
     setStatusloading(false)
      setStatusErro(true);
      setTextErro('Por favor, preencha o seu E-mail.');
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
      return alert(dados.msg)
    }
    setStatusloading(false)
    navigate('/success')  
   } catch (error) {
    alert(error)
   }
   
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
    {statusErro && <p className='status-erro-change-password'>{textErro}</p>} 
      </form>

    </div>
    {statusloading && <Loading/> }
    
     
    </>
  )
}

export default Formchange
