

import { useEffect, useRef, useState } from 'react';
import './cadastrardisciplina.css'
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading.tsx';


function Cadastrardisciplina() {
const {rotacriardisc} = usarcontextoapi();
const [statusreq, setStatusreq] = useState<string>(); // Indica a mensagem recebida pelo backend.
const [statusmsgerro, setStatusmsgerro] = useState<boolean>(); // Indica se é uma mensagem de erro ou não
const [statusresponse, setStatusresponse] = useState<boolean>(false);  // Indica se a caixa de resposta deve ser exibida ou não
const nome = useRef<HTMLInputElement>(null);
const descricao = useRef<HTMLTextAreaElement>(null);
const anoLetivo = useRef<HTMLInputElement>(null);
const cargaHoraria = useRef<HTMLInputElement>(null);
const divresponse = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()


async function cadastrar_disciplina(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if(!nome.current || !descricao.current || !cargaHoraria.current || !anoLetivo.current ) {
    return;
  }
  const dados = {
    nome: nome.current.value,
    descricao: descricao.current.value,
    cargaHoraria: Number(cargaHoraria.current.value) ,
    anoLetivo: Number(anoLetivo.current.value),
  };
  console.log(dados)
try {
  setLoading(true)
  const response = await fetch(rotacriardisc, {
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
descricao.current.value = '';
cargaHoraria.current.value = '';
anoLetivo.current.value = '';

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
    <form className='form-cadastrar-disciplina' onSubmit={cadastrar_disciplina}>
      <div className='container-input'>
        <span className='span-cadastrar-disciplina'>Nome da disciplina:</span>
        <input type="text" className='input-cadastrar-disciplina' ref={nome} placeholder='Digite o nome da disciplina'/>
      </div>
      <div className='container-input'>
        <span className='span-cadastrar-disciplina'>Descrição:</span>
        <textarea  className='input-cadastrar-disciplina' id='textarea' placeholder="Digite sua descrição aqui..." ref={descricao} />
      </div>
      <div className='container-input'>
        <span className='span-cadastrar-disciplina'>Carga horária:</span>
        <input type="number" className='input-cadastrar-disciplina' ref={cargaHoraria} placeholder='Digite a carga horaria'/>
      </div>
     
      <div className='container-input'>
        <span className='span-cadastrar-disciplina'>Ano letivo:</span>
        <input type="number" className='input-cadastrar-disciplina' ref={anoLetivo} placeholder='Digite o ano letivo'/>
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

export default Cadastrardisciplina
