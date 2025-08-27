import { useEffect, useRef, useState } from 'react';
import './modaleditarprofessores.css'
//import { usarcontextoapi } from '../../context/contextapi.tsx';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Modal_editar_professores() {
//const {rotaeditarprofessores} = usarcontextoapi();
const {setStatusmodal,Selectionmodal}=usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const status = useRef<HTMLSelectElement>(null);
const nome = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const [loading] = useState<boolean>()
const [editando] = useState({
  nome:false,
  status:false,
  
})

/*async function atualizar_usuario(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
     
  const dados = {
    nome: nome.current?.value.trim(),
    status: status.current?.value ==  "ativo" ? true : false ,
    userId:Selectionmodal.userId
  
  }
try {
  setLoading(true)
  const response = await fetch(rotaeditarprofessores, {
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

  */
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

useEffect(()=>{
  if(editando.nome === true){
     nome.current?.classList.add('input-ativo')
  } else{
  nome.current?.classList.remove('input-ativo')
  }
  if(editando.status === true){
     status.current?.classList.add('input-ativo')
  } else{
  status.current?.classList.remove('input-ativo')
  }
  

},[editando])


  return (
    <>
    <div className='modal'>
   
    <form className='form-modal-usuario' >
      <img src='/close-modal.png' alt='fechar' className='close-modal' id='close-modal-editar-prof' onClick={closemodal}></img>
       <table className='table-consultar'>
         
        <thead>
        <tr>
          <th className='table-header'>Código</th>
          <th className='table-header'>Disciplina</th>  
        </tr>
        </thead>
        <tbody>
          {Selectionmodal.map((element: any) => {
            const disciplina = element?.dadosdisciplinas?.[0];
            return (
              <tr key={element.discId} className="line-table">
                <td className="information-table">{disciplina?.codigo}</td>
                <td className="information-table">{disciplina?.nome}</td>
              </tr>
            );
          })}

          
        </tbody>
      </table>     
      
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

export default Modal_editar_professores
