import { useEffect, useRef, useState } from 'react';
import './modaleditardisciplina.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Modal_editar_disciplina() {
const {rotaeditardisciplina} = usarcontextoapi();
const {setStatusmodal,Selectionmodal}=usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const status = useRef<HTMLSelectElement>(null);
const nome = useRef<HTMLInputElement>(null);
const tipo = useRef<HTMLSelectElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [editando,setEditando] = useState({
  nome:false,
  tipo:false,
  status:false,
  
})

async function atualizar_disciplina(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
     
  const dados = {
    nome: nome.current?.value.trim(),
    status: status.current?.value ==  "ativo" ? true : false ,
    tipo: tipo.current?.value,
    userId:Selectionmodal.userId
  
  }
try {
  setLoading(true)
  const response = await fetch(rotaeditardisciplina, {
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

useEffect(()=>{
  if(editando.nome === true){
     nome.current?.classList.add('input-ativo')
  } else{
  nome.current?.classList.remove('input-ativo')
  }
  if(editando.tipo === true){
     tipo.current?.classList.add('input-ativo')
  } else{
  tipo.current?.classList.remove('input-ativo')
  }
  if(editando.status === true){
     status.current?.classList.add('input-ativo')
  } else{
  status.current?.classList.remove('input-ativo')
  }
  

},[editando])

useEffect(() => {
  console.log(Selectionmodal)
}, []);


  return (
    <>
    <div className='modal'>
   
    <form className='form-modal-disciplina' onSubmit={atualizar_disciplina}>
      <img src='/close-modal.png' alt='fechar' className='close-modal' onClick={closemodal}></img>
      <div className='container-input'>
        <span className='span-modal-disciplina'>Nome:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-disciplina' ref={nome} disabled={!editando.nome} defaultValue={Selectionmodal?.nome || ''}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, nome: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, nome: false }))}></img>
          </div>
            
        </div>  
        
      </div>
      <div className='container-input'>
        <span className='span-modal-disciplina'>Tipo:</span>
        <div className='container-input-icon-modal'>
         <select className='input-modal-disciplina'  ref={tipo} disabled={!editando.tipo}  defaultValue={Selectionmodal?.tipo}  >
            <option value="" disabled hidden> Selecione uma opção</option>
            <option value={'prof'}>Professor</option>
            <option value={'admin'}>Administrador</option>           
          </select>
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, tipo: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, tipo: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-disciplina'>Status:</span>
       <div className='container-input-icon-modal'>
        <select className='input-modal-disciplina'  ref={status} disabled={!editando.status}  defaultValue={ Selectionmodal?.status == true ? "ativo" : "inativo" }  >
            <option value="" disabled hidden> Selecione uma opção</option>
            <option value={'ativo'}>Ativo</option>
            <option value={'inativo'}>Inativo</option>           
          </select>
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, status: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, status: false }))}></img>
          </div>
            
        </div>  
      </div>
         
      
      <button className='btn-modal' type='submit'>Atualizar</button>

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

export default Modal_editar_disciplina
