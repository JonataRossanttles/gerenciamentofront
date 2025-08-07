import { useEffect, useRef, useState } from 'react';
import './modaleditaraluno.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Modal_editar_aluno() {
const {rotaeditaraluno} = usarcontextoapi();
const {setStatusmodal,alunoSelecionado}=usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const aluno = useRef<HTMLInputElement>(null);
const serie = useRef<HTMLInputElement>(null);
const turno = useRef<HTMLInputElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const sala = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [editando,setEditando] = useState({
  aluno:false,
  serie:false,
  turno:false,
  anoLetivo:false,
  sala:false
})

async function atualizar_aluno(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
     
  const dados = {
    aluno: aluno.current?.value,
    serie: serie.current?.value,
    turno: turno.current?.value,
    anoLetivo: anoLetivo.current?.value,
    sala: sala.current?.value,
    alunoId: alunoSelecionado.alunoId
  }
try {
  setLoading(true)
  const response = await fetch(rotaeditaraluno, {
  method: 'POST',
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
  if(editando.aluno === true){
     aluno.current?.classList.add('input-ativo')
  } else{
  aluno.current?.classList.remove('input-ativo')
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
  console.log(alunoSelecionado)
}, []);


  return (
    <>
    <div className='modal'>
   
    <form className='form-modal-aluno' onSubmit={atualizar_aluno}>
      <img src='/close-modal.png' alt='fechar' className='close-modal' onClick={closemodal}></img>
      <div className='container-input'>
        <span className='span-modal-aluno'>aluno:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={aluno} disabled={!editando.aluno} defaultValue={alunoSelecionado?.aluno || ''}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, aluno: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, aluno: false }))}></img>
          </div>
            
        </div>  
        
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Série:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={serie} disabled={!editando.serie} defaultValue={alunoSelecionado?.serie}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, serie: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, serie: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Turno:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={turno} disabled={!editando.turno} defaultValue={alunoSelecionado?.turno}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, turno: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, turno: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Ano letivo:</span>
          <div className='container-input-icon-modal'>
          <input type="number" className='input-modal-aluno' ref={anoLetivo} disabled={!editando.anoLetivo} defaultValue={alunoSelecionado?.anoLetivo}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, anoLetivo: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, anoLetivo: false }))} ></img>
          </div>
            
        </div>  
      </div>
    
      <div className='container-input'>
        <span className='span-modal-aluno'>Sala:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={sala} disabled={!editando.sala} defaultValue={alunoSelecionado?.sala}/> 
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

export default Modal_editar_aluno
