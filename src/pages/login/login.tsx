import { useEffect, useRef , useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usarcontextoapi } from '../../context/contextapi';
import { usarcontexto } from '../../context/context';
import './login.css'
import Loading from '../../components/loading/loading';

function Login() {
  const { rotaLogin } = usarcontextoapi();
  const { setAuthenticated } = usarcontexto();
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSenha = useRef<HTMLInputElement>(null);
  const [mostrarsenha, setMostrarsenha] = useState<boolean>(false);
  const [typeinput, setTypeinput] = useState<string>('password');
  const navigate = useNavigate();
  const [statusloading,setStatusloading] = useState<boolean>(false)

  const enviar = async (e:any)=>{
    setStatusloading(true)
    e.preventDefault();
    try {
       const resposta = await fetch(rotaLogin,{method:'POST',
      headers:{'Content-type':'application/json'},
      credentials: 'include',
       body: JSON.stringify({
        email: inputEmail.current?.value,
        senha: inputSenha.current?.value
      })
    })
      const dados = await resposta.json()
      if(!resposta.ok) {
        setStatusloading(false)
        setAuthenticated(false);
        return alert(dados.msg);
      }
      else{
        localStorage.setItem('infouser',JSON.stringify(dados))
        setStatusloading(false)
        setAuthenticated(true);
        return navigate('/adm');
      }
    
    } catch (error) {
       setStatusloading(false)
      return alert(error)
    }
   
  }
useEffect(()=>{
setTypeinput(mostrarsenha ? 'text' : 'password');
},[mostrarsenha])

  return (
    <>
      <section className='container-login-back'>
        <div className='container-login'>
          <img src="/imglogin.jpg" alt="imagem de login" className='imglogin' />
          <div className='container-form-login'>
            <form className='form-login' onSubmit={enviar}>
              <h1 className='title-login'>SISTEMA DE GERENCIAMENTO ESCOLAR</h1>
              <input type="text" placeholder="Digite seu email" className='input-login' ref={inputEmail} />
              <input type={typeinput} placeholder="Digite sua senha" className='input-login' ref={inputSenha} />
              <button type="button" className='button-toogle-senha' onClick={() => {setMostrarsenha(!mostrarsenha)}}>
                <img className='img-toogle-senha' src={mostrarsenha ? '/ocultar-senha.png' : '/olhar-senha.png'}></img>
              </button>
              <button className='button-login' type="submit">Entrar</button>
            </form>
            <Link to="/change-password" className='link-change-password'>Esqueceu sua senha? Clique aqui</Link>
          </div>
          
        </div>


      </section>
      {statusloading && <Loading/>}
    </>
  )
}

export default Login;
