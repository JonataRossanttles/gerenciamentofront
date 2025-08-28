import './inicio.css'


import {  useEffect, useState } from 'react';
import { usarcontextoapi } from '../../context/contextapi.tsx';
import { useNavigate } from 'react-router-dom';
import { usarcontexto } from '../../context/context.tsx';
import Loading from '../loading/loading';

function Inicio() {
const {rotaconsultar_dadosbanco} = usarcontextoapi();
const {infouser} = usarcontexto()
const navigate = useNavigate();
const [loading,setLoading] = useState<boolean>()
const [consumodb,setConsumodb] = useState<any>({})
const planosmongodb = {
  m0:500.00,
  flex:5000.00,
  m10:10000.00,
  m20:20000.00,
}

async function consultar_bancodb() {

try {
  setLoading(true)
  const response = await fetch(rotaconsultar_dadosbanco, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
const information = await response.json();

if(response.status === 401) {
 navigate('/');
 return;
}
if(!response.ok){
  setLoading(false)
  return;
}
setLoading(false) 
setConsumodb(information.msg)

} catch (error) {
  setLoading(false)
 
}
 
  }

useEffect(() => {
  consultar_bancodb();
}, []);

//consumodb.dataSizeMB
  return (
    <>
    
      
   {infouser == 'admin' && <div className='container-inicio'>
     <h1 className='title-inicio'>Consumo do banco de dados</h1>
      <div className='container-dados-inicio'>
          <div className='dadosdb'>
          <p>Consumo atual: {((consumodb.dataSizeMB / planosmongodb.m0) * 100).toFixed(2)}%</p>
          <img src= {
    Number(((consumodb.dataSizeMB / planosmongodb.m0) * 100).toFixed(2)) < 90 
      ? '/ok-consumo-banco.png' 
      : '/alerta.png'
  } alt='Consumo do banco de dados' className='status-consumodb'></img>

        </div>
        <div className='dadosdb'>
          <p>Consumo dos dados: {(consumodb.dataSizeMB ?? 0).toFixed(2)}MB</p>
        </div>
        <div className='dadosdb'>
          <p>Capacidade do banco: {planosmongodb.m0.toFixed(2)}MB</p>
        </div>
      </div>
    </div>
}  
{infouser == 'prof' && (
  <div className='container-inicio'>
    <h1 className='title-inicio'>Sistema de gerenciamento escolar</h1>
    <p>Bem-vindo ao sistema de gerenciamento escolar. Aqui você pode gerenciar suas turmas, alunos e muito mais.</p>
  </div>
)}
 {loading && <Loading />}
    </>
  )

}

export default Inicio;
