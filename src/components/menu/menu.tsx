
import './menu.css'

function Menu() {

function toggle (){

}
  return (
    <>
    <div className='container-geral-menu'>
      <img  src='/logo.png' alt='logo' className='logo'></img>
      <div className='container-option-principal'>
        <div className='option-principal'>
          <span className='text-option-principal' onClick={toggle}>Cadastrar</span>
          <img src='/seta-down.png' alt='icon-setinha' className='icon-open-options'></img>
        </div>
        
        <div className='container-options'>
        <div className='div-option'><span className='text-option'>Turma</span></div>
        <div className='div-option'><span className='text-option'>Alunos</span></div>
        <div className='div-option'><span className='text-option' >Professores</span></div>
        <div className='div-option'><span className='text-option'>Disciplina</span></div>
      </div>
      </div>
      

    </div>
    </>
  )
}

export default Menu
