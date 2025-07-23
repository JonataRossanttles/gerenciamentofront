

import './header.css'
import { usarcontexto } from '../../context/context'

function Header() {
  const { informationmenu } = usarcontexto();

  return (
    <>
    <div className="container-header">
      <h2>{informationmenu}</h2>
    </div>
   
    </>
  )
}

export default Header
