import { useEffect, useRef } from 'react'
import { MdAttachFile } from 'react-icons/md'
import FilePreview from './FilePreview'

import styles from './FileInput.module.css'
export default function FileInput({files,setFiles}) {
    
    // const indexDb = window.indexedDB.open()
    const handleLoadLocalFile=(e)=>{
        e.preventDefault();
        setFiles(e.target.files[0])
    }
  // иммутабельная ссылка на инпут для добавления файла
  // мы скрываем инпут за кнопкой
  const inputRef = useRef()

  // сбрасываем значение инпута при отсутствии файла
  useEffect(() => {
    if (!files) {
      inputRef.current.value = ''
    }
  }, [files])

  return (
    <div className='container file'>
      <input
        type='file'
        accept='image/*, audio/*, video/*'
        onChange={(e) => {
            handleLoadLocalFile(e)}}
        className={styles.visuallyHidden}
        ref={inputRef}
      />
      <button
        type='button'
        className={styles.btn}
        // передаем клик инпуту
        onClick={() => inputRef.current.click()}
      >
        <MdAttachFile className='icon' />
      </button>

      {files && <FilePreview files={files} setFiles={setFiles} />}
    </div>
  )
}