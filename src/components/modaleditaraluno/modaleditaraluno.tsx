import { useEffect, useRef, useState } from 'react';
import './modaleditaraluno.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';
import { usarcontexto } from '../../context/context.tsx';


function Modal_editar_aluno() {
const {rotaeditaraluno} = usarcontextoapi();
const {setStatusmodal,Selectionmodal}=usarcontexto()
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const nome = useRef<HTMLInputElement>(null);
const dataNascimento = useRef<HTMLInputElement>(null);
const sexo = useRef<HTMLSelectElement>(null);
const nomeResponsavel = useRef<HTMLInputElement>(null);
const telefoneResponsavel = useRef<HTMLInputElement>(null);
const emailResponsavel = useRef<HTMLInputElement>(null);
const rua = useRef<HTMLInputElement>(null);
const numero = useRef<HTMLInputElement>(null);
const bairro = useRef<HTMLInputElement>(null);
const cidade = useRef<HTMLInputElement>(null);
const estado = useRef<HTMLInputElement>(null);
const cep = useRef<HTMLInputElement>(null);
const situacao = useRef<HTMLSelectElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [editando,setEditando] = useState({
  nome:false,
  dataNascimento:false,
  sexo:false,
  nomeResponsavel:false,
  telefoneResponsavel:false,
  emailResponsavel:false,
  cep:false,
  rua:false,
  numero:false,
  bairro:false,
  cidade:false,
  estado:false,
  situacao:false,
})

async function atualizar_aluno(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
     
  const dados = {
    nome: nome.current?.value,
    dataNascimento: dataNascimento.current?.value,
    sexo: sexo.current?.value,
    nomeResponsavel: nomeResponsavel.current?.value,
    telefoneResponsavel: telefoneResponsavel.current?.value,
    emailResponsavel: emailResponsavel.current?.value,
    situacao: situacao.current?.value,
    endereco:{
      cep: cep.current?.value,
      rua: rua.current?.value,
      numero: numero.current?.value,
      bairro: bairro.current?.value,
      cidade: cidade.current?.value,
      estado: estado.current?.value,
    },
    alunoId: Selectionmodal.alunoId
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
  if(editando.dataNascimento === true){
     dataNascimento.current?.classList.add('input-ativo')
  } else{
  dataNascimento.current?.classList.remove('input-ativo')
  }
  if(editando.sexo === true){
     sexo.current?.classList.add('input-ativo')
  } else{
  sexo.current?.classList.remove('input-ativo')
  }
  if(editando.nomeResponsavel === true){
     nomeResponsavel.current?.classList.add('input-ativo')
  } else{
  nomeResponsavel.current?.classList.remove('input-ativo')
  }
  if(editando.telefoneResponsavel === true){
     telefoneResponsavel.current?.classList.add('input-ativo')
  } else{
  telefoneResponsavel.current?.classList.remove('input-ativo')
  }
  if(editando.emailResponsavel === true){
     emailResponsavel.current?.classList.add('input-ativo')
  } else{
  emailResponsavel.current?.classList.remove('input-ativo')
  }
  if(editando.cep === true){
     cep.current?.classList.add('input-ativo')
  } else{
  cep.current?.classList.remove('input-ativo')
  }
  if(editando.rua === true){
     rua.current?.classList.add('input-ativo')
  } else{
  rua.current?.classList.remove('input-ativo')
  }
  if(editando.numero === true){
     numero.current?.classList.add('input-ativo')
  } else{
  numero.current?.classList.remove('input-ativo')
  }
  if(editando.bairro === true){
     bairro.current?.classList.add('input-ativo')
  } else{
  bairro.current?.classList.remove('input-ativo')
  }
  if(editando.cidade === true){
     cidade.current?.classList.add('input-ativo')
  } else{
  cidade.current?.classList.remove('input-ativo')
  }
  if(editando.estado === true){
     estado.current?.classList.add('input-ativo')
  } else{
  estado.current?.classList.remove('input-ativo')
  }
  if(editando.situacao === true){
     situacao.current?.classList.add('input-ativo')
  } else{
  situacao.current?.classList.remove('input-ativo')
  }

},[editando])

useEffect(() => {
  console.log(Selectionmodal)
}, []);


  return (
    <>
    <div className='modal'>
   
    <form className='form-modal-aluno' onSubmit={atualizar_aluno}>
      <img src='/close-modal.png' alt='fechar' className='close-modal' onClick={closemodal}></img>
      <div className='container-editar-aluno'>

      <div className='container-1-editar-aluno'>

      <div className='container-input'>
        <span className='span-modal-aluno'>Nome:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={nome} disabled={!editando.nome} defaultValue={Selectionmodal?.nome || ''}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, nome: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, nome: false }))}></img>
          </div>
            
        </div>  
        
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Data de nascimento:</span>
        <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={dataNascimento} disabled={!editando.dataNascimento} defaultValue={Selectionmodal?.dataNascimento}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, dataNascimento: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, dataNascimento: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Sexo:</span>
        <div className='container-input-icon-modal'>
          <select  className='input-modal-aluno' ref={sexo} disabled={!editando.sexo} defaultValue={Selectionmodal?.sexo}> 
            <option>Masculino</option>
            <option>Feminino</option>
            </select> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, sexo: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, sexo: false }))}></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Nome do responsável:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={nomeResponsavel} disabled={!editando.nomeResponsavel} defaultValue={Selectionmodal?.nomeResponsavel}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal'onClick={() => setEditando(prev => ({ ...prev, nomeResponsavel: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, nomeResponsavel: false }))} ></img>
          </div>
            
        </div>  
      </div>
    
      <div className='container-input'>
        <span className='span-modal-aluno'>Tel. do responsável:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={telefoneResponsavel} disabled={!editando.telefoneResponsavel} defaultValue={Selectionmodal?.telefoneResponsavel}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, telefoneResponsavel: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, telefoneResponsavel: false }))} ></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>E-mail do responsável:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={emailResponsavel} disabled={!editando.emailResponsavel} defaultValue={Selectionmodal?.emailResponsavel}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, emailResponsavel: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, emailResponsavel: false }))} ></img>
          </div>
            
        </div>  
      </div>
      <div className='container-input'>
        <span className='span-modal-aluno'>Situação escolar:</span>
          <div className='container-input-icon-modal'>
          <select  className='input-modal-aluno' ref={situacao} disabled={!editando.situacao} defaultValue={Selectionmodal?.situacao.toUpperCase()}>
            <option value={'ATIVO'}>Ativo</option>
            <option value={'CANCELADO'}>Cancelado</option>
            <option value={'TRANCADO'}>Trancado</option>
            <option value={'ABANDONO'}>Abandono</option>
            <option value={'CONCLUIDO'}>Concluido</option>
            <option value={'PRE-MATRICULADO'}>Pré-matriculado</option>
             </select>
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, situacao: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, situacao: false }))} ></img>
          </div>
            
        </div>  
      </div>
 </div>

      <div className='container-2-editar-aluno'>

<div className='container-input'>
        <span className='span-modal-aluno'>CEP:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={cep} disabled={!editando.cep} defaultValue={Selectionmodal?.endereco.cep}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, cep: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, cep: false }))} ></img>
          </div>
        </div> 
         </div>
      
<div className='container-input'>
        <span className='span-modal-aluno'>Rua:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={rua} disabled={!editando.rua} defaultValue={Selectionmodal?.endereco.rua}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, rua: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, rua: false }))} ></img>
          </div>
        </div> 
         </div>

<div className='container-input'>
        <span className='span-modal-aluno'>Número:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={numero} disabled={!editando.numero} defaultValue={Selectionmodal?.endereco.numero}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, numero: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, numero: false }))} ></img>
          </div>
        </div> 
         </div>
<div className='container-input'>
        <span className='span-modal-aluno'>Bairro:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={bairro} disabled={!editando.bairro} defaultValue={Selectionmodal?.endereco.bairro}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, bairro: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, bairro: false }))} ></img>
          </div>
        </div> 
         </div>

<div className='container-input'>
        <span className='span-modal-aluno'>Cidade:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={cidade} disabled={!editando.cidade} defaultValue={Selectionmodal?.endereco.cidade}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, cidade: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, cidade: false }))} ></img>
          </div>
        </div> 
         </div>

      <div className='container-input'>
        <span className='span-modal-aluno'>Estado:</span>
          <div className='container-input-icon-modal'>
          <input type="text" className='input-modal-aluno' ref={estado} disabled={!editando.estado} defaultValue={Selectionmodal?.endereco.estado}/> 
          <div className='container-icon-modal'>
            <img src='/icon-editar.png' alt='Editar'className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, estado: true }))} ></img>
            <img src='/icon-salvar.png' alt='Salvar' className='icon-modal' onClick={() => setEditando(prev => ({ ...prev, estado: false }))} ></img>
          </div>
        </div> 
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
