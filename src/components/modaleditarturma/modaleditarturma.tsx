import { useEffect, useRef, useState } from 'react';
import './modaleditarturma.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Modal_consultar_turma() {
const {rotaeditarturma} = usarcontextoapi();
const {setStatusmodal,Selectionmodal}=usarcontexto()
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
const [editando,setEditando] = useState({
  turma:false,
  serie:false,
  turno:false,
  anoLetivo:false,
  sala:false
})

async function atualizar_turma(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
     
  const dados = {
    turma: turma.current?.value,
    serie: serie.current?.value,
    turno: turno.current?.value,
    anoLetivo: anoLetivo.current?.value,
    sala: sala.current?.value,
    turmaId: Selectionmodal.turmaId
  }
try {
  setLoading(true)
  const response = await fetch(rotaeditarturma, {
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
  if(editando.turma === true){
     turma.current?.classList.add('input-ativo')
  } else{
  turma.current?.classList.remove('input-ativo')
  }
  if(editando.serie === true){
     serie.current?.classList.add('input-ativo')
  } else{
  serie.current?.classList.remove('input-ativo')
  }
  if(editando.turno === true){
     turno.current?.classList.add('input-ativo')
  } else{
  turno.current?.classList.remove('input-ativo')
  }
  if(editando.anoLetivo === true){
     anoLetivo.current?.classList.add('input-ativo')
  } else{
  anoLetivo.current?.classList.remove('input-ativo')
  }
  if(editando.sala === true){
     sala.current?.classList.add('input-ativo')
  } else{
  sala.current?.classList.remove('input-ativo')
  }

},[editando])

useEffect(() => {
  console.log(Selectionmodal)
}, []);


  return (
    <>
    <div className='modal'>
   
    <form className='form-modal-turma' onSubmit={atualizar_turma}>
      <img src='/close-modal.png' alt='fechar' className='close-modal' onClick={closemodal}></img>
      <div className='container-input'>
        <span className='span-modal-turma'>Turma:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-turma' ref={turma} disabled={!editando.turma} defaultValue={Selectionmodal?.turma || ''}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, turma: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, turma: false }))}></img>
          </div>
            
        </div>  
        
      </div>
      <div className='container-input'>
        <span className='span-modal-turma'>Série:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-turma' ref={serie} disabled={!editando.serie} defaultValue={Selectionmodal?.serie}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, serie: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, serie: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-turma'>Turno:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-turma' ref={turno} disabled={!editando.turno} defaultValue={Selectionmodal?.turno}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, turno: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, turno: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-turma'>Ano letivo:</span>
          <div className='container-input-icon-modal'>
          <input type="number" min={0} className='input-modal-turma' ref={anoLetivo} disabled={!editando.anoLetivo} defaultValue={Selectionmodal?.anoLetivo}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, anoLetivo: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, anoLetivo: false }))} ></img>
          </div>
            
        </div>  
      </div>
    
      <div className='container-input'>
        <span className='span-modal-turma'>Sala:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-turma' ref={sala} disabled={!editando.sala} defaultValue={Selectionmodal?.sala}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, sala: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, sala: false }))} ></img>
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

export default Modal_consultar_turma
