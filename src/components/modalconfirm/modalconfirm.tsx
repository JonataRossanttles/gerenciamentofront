import { usarcontexto } from '../../context/context.tsx';
type ModalConfirmProps = {
  excluir: () => void;
}

function Modal_confirm({excluir}:ModalConfirmProps) {
  const {setStatusmodalconfirm} = usarcontexto()

  return (
    <>
    <div className='modal'>
   <div className='container-cofirm'>
    <span className='span-confirm'>Tem certeza que deseja realizar essa ação?</span>
    <div className='container-button-confirm'>
       <button className='button-confirm' id='confirm-sim' onClick={excluir}>Sim</button>
    <button className='button-confirm' id='confirm-nao' onClick={()=>{setStatusmodalconfirm(false)}}>Não</button>
    </div>
   
   </div>
   

    </div>  

    </>
  )

}

export default Modal_confirm
