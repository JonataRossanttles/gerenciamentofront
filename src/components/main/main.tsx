

import './main.css'



function Main() {
  
  return (
    <>
    <form className='main'>
      <div className='container-input'>
        <span>Turma:</span>
        <input type="text" className='input-turma' />
      </div>
      <div className='container-input'>
        <span>Série:</span>
        <input type="text" className='input-turma' />
      </div>
      <div className='container-input'>
        <span>Turno:</span>
        <input type="text" className='input-turma' />
      </div>
      <div className='container-input'>
        <span>Ano letivo:</span>
        <input type="number" className='input-turma' />
      </div>
    
      <div className='container-input'>
        <span>Sala:</span>
        <input type="text" className='input-turma' />
      </div>
    </form>
   
    </>
  )
}

export default Main
