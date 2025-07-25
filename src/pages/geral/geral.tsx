import './geral.css'
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import { Outlet } from 'react-router-dom';


function Geral() {
 


  return (
    <>
      <Menu />
      <div className='container-geral'>
      <Header />
      <Outlet />
      </div>
      
      
    </>
  )
}

export default Geral;
