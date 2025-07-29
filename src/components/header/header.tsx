

import './header.css'
import { usarcontexto } from '../../context/context'
import { useEffect } from 'react';


function Header() {
  
  const { informationmenu,useinformationmenu } = usarcontexto();
 useEffect(()=>{
  useinformationmenu("Início")
  
 },[])
  return (
    <>
    <div className="container-header">
      <h2 className='text-header'>{informationmenu}</h2>
    
  </div>
   
    </>
  )
}

export default Header
