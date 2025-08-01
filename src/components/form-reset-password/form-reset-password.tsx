
import {  useEffect, useRef, useState } from 'react'
import './form-reset-password.css'
import { usarcontextoapi } from '../../context/contextapi'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../loading/loading'

function Formreset() {
const parametro = useParams()
const navigate = useNavigate()
const [token,setToken]= useState<string>()
const [statusformreset,setStatusformreset]= useState<boolean>(true)
const {rotaResetpassword} = usarcontextoapi()
const senharef = useRef<HTMLInputElement>(null)
const [statusloading,setStatusloading] = useState<boolean>(false)

useEffect(()=>{
  console.log(parametro.token)
  setToken(parametro.token)
  
},[])

const enviarreset = async (e:any)=>{
e.preventDefault()
setStatusloading(true)

if(senharef.current){
  const senha = senharef.current.value
  if(!senha) return alert('Digite o campo de senha!')

try {

  const resposta = await fetch(rotaResetpassword,{method:'POST',
  headers:{'Content-type':'application/json'},
  body:JSON.stringify({token:token,senha:senha})
})

const dados = await resposta.json()
if (!resposta.ok){
  setStatusloading(false)
  alert(dados.msg)
 return
}
  alert(dados.msg)
  setStatusformreset(false)
  navigate('/login')
  return

} catch (error) {
  setStatusloading(false)
   alert(error)
}


}


}

  return (
    <>
   {statusformreset && <div className='container-change-password'>
       <form className='form-change-password' onSubmit={enviarreset}>
        <h2 className='title-change-password'>Digite sua nova senha </h2>
        <div className='container-input-change-password'>
          <input type="password" placeholder="Digite uma nova Senha" className='input-change-password'  ref={senharef} />
          <button type="submit" className='button-change-password'>Enviar</button>
        </div>
      </form>

    </div> }  

    {statusloading && <Loading/>}
     
    </>
  )
}

export default Formreset
