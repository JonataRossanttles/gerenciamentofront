

import { useEffect, useRef, useState } from 'react';
import './cadastraraluno.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';



function cadastraraluno() {
const {rotacriaraluno} = usarcontextoapi();
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
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();

async function cadastrar_aluno(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if(!nome.current || !dataNascimento.current ||
     !sexo.current || !nomeResponsavel.current ||  !emailResponsavel.current ||
     !telefoneResponsavel.current || !rua.current ||
     !numero.current || !bairro.current || !cidade.current ||
     !estado.current || !cep.current) {
    return;
  }else{
const dados = {
    nome: nome.current.value,
    dataNascimento: dataNascimento.current.value,
    sexo: sexo.current.value,
    nomeResponsavel: nomeResponsavel.current.value,
    telefoneResponsavel: telefoneResponsavel.current.value,
    emailResponsavel: emailResponsavel.current.value,
    endereco: {
      rua: rua.current.value,
      numero: numero.current.value,
      bairro: bairro.current.value,
      cidade: cidade.current.value,
      estado: estado.current.value,
      cep: cep.current.value
  }
  }
  
const response = await fetch(rotacriaraluno, {
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
  if (nome.current)
    nome.current.value = '';
  if (dataNascimento.current)
    dataNascimento.current.value = '';
  if (sexo.current)
    sexo.current.value = '';
  if (nomeResponsavel.current)
    nomeResponsavel.current.value = '';
  if (telefoneResponsavel.current)
    telefoneResponsavel.current.value = '';
  if (emailResponsavel.current)
    emailResponsavel.current.value = '';
  if (rua.current)
    rua.current.value = '';
  if (numero.current)
    numero.current.value = '';
  if (bairro.current)
    bairro.current.value = '';
  if (cidade.current)
    cidade.current.value = '';
  if (estado.current)
    estado.current.value = '';
  if (cep.current)
    cep.current.value = '';

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
<section className='main-cadastrar-aluno'>
      
  <form className='form-cadastrar-aluno' onSubmit={cadastrar_aluno}>
    <div className='form-information-cadastrar-aluno'>
      <div className='container-1'>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Nome:</span>
          <input type="text" className='input-cadastrar-aluno' ref={nome}  placeholder='Digite o nome do aluno'/>
        </div>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Data de nascimento:</span>
          <input type="date" className='input-cadastrar-aluno' ref={dataNascimento} placeholder='Digite a data de nascimento'/>
        </div>
         <div className='container-input'>
          <span className='span-cadastrar-aluno'>Sexo:</span>
          <select className='input-cadastrar-aluno' ref={sexo} defaultValue="">
            <option value="" disabled selected hidden style={{ color: '#888' }}>Selecione o sexo</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            
          </select>

         </div>
        
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Nome do responsável:</span>
          <input type="text" className='input-cadastrar-aluno' ref={nomeResponsavel} placeholder='Digite o nome do responsável'/>
        </div>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Telefone do responsável:</span>
          <input type="number" className='input-cadastrar-aluno' ref={telefoneResponsavel} placeholder='Digite o telefone do responsável'/>
        </div>
      
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>E-mail do responsável:</span>
          <input type="text" className='input-cadastrar-aluno' ref={emailResponsavel} placeholder='Digite o e-mail do responsável'/>
        </div>
    </div>
    <div className='container-2'>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>CEP:</span>
          <input type="text" className='input-cadastrar-aluno' ref={cep} placeholder='Digite o CEP do aluno'/>
        </div>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Rua:</span>
          <input type="text" className='input-cadastrar-aluno'  ref={rua} placeholder='Digite a rua do aluno'/>
        </div>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Número:</span>
          <input type="text" className='input-cadastrar-aluno' ref={numero} placeholder='Digite o número da residência do aluno'/>
        </div>
        <div className='container-input'>
          <span className='span-cadastrar-aluno'>Bairro:</span>
          <input type="text" className='input-cadastrar-aluno' ref={bairro} placeholder='Digite o Bairro do aluno'/>
          </div>
        <div className='container-input'>
            <span className='span-cadastrar-aluno'>Cidade:</span>
            <input type="text" className='input-cadastrar-aluno' ref={cidade} placeholder='Digite a cidade do aluno'/>
          </div>
        <div className='container-input'>
            <span className='span-cadastrar-aluno'>Estado:</span>
            <input type="text" className='input-cadastrar-aluno' ref={estado} placeholder='Digite o estado do aluno'/>
          </div>
      
    </div>
    
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

export default cadastraraluno
