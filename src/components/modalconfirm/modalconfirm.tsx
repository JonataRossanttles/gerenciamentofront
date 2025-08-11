import { useEffect, useRef, useState } from 'react';

import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import { usarcontexto } from '../../context/context.tsx';
import Loading from '../loading/loading.tsx';


function Modal_confirm() {
const {rotaatualizarturma} = usarcontextoapi();
const {setStatusmodalconfirm,Selectionmodal}=usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()


async function excluir_turma() {
     
  const dados = {
    turmaId: Selectionmodal.turmaId
  }
try {
  setLoading(true)
  const response = await fetch(rotaatualizarturma, {
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
    <div className='modal'>
   <div className='container-cofirm'>
    <span className='span-confirm'>Tem certeza que deseja realizar essa ação?</span>
    <div className='container-button-confirm'>
       <button className='button-confirm' id='confirm-sim' onClick={excluir_turma}>Sim</button>
    <button className='button-confirm' id='confirm-nao'>Não</button>
    </div>
   
   </div>
   

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

export default Modal_confirm
