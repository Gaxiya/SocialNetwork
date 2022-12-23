import React from 'react'
import styles from './modalWindowForm.module.css'
function ModalWindowForm({active,setActive,children}) {
  return (
    <div
    onClick={()=>{setActive(false)}}
    className={ active ? `${styles.modal} ${styles.active}`:`${styles.modal}`}
    >
      <div 
      onClick={(e)=>{e.stopPropagation()}}
      className={ active ? `${styles.modal__content} ${styles.active}`:`${styles.modal__content}`}>
        {children}
      </div>
    </div>
  )
}

export default ModalWindowForm