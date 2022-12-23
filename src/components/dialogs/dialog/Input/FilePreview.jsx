import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './FilePreview.module.css'
export default function FilePreview({files,setFiles}) {

  // локальное состояние для источника файла
  const [src, setSrc] = useState()
  // локальное состояние для типа файла
  const [type, setType] = useState()

  // при наличии файла обновляем источник и тип файла
  useEffect(() => {
    if (files) {
      setSrc(URL.createObjectURL(files))
      setType(files.type.split('/')[0])
    }
  }, [files])

  // элемент для рендеринга зависит от типа файла
  let element

  switch (type) {
    case 'image':
      element = <img src={src} alt={files.name} />
      break
    case 'audio':
      element = <audio src={src} controls></audio>
      break
    case 'video':
      element = <video src={src} controls></video>
      break
    default:
      element = null
      break
  }

  return (
    <div className={styles.preview}>
      {element}

      <button
        type='button'
        className='btn close'
        // обнуляем файл при закрытии превью
        onClick={() => setFiles(null)}
      >
        <AiOutlineClose className='icon close' />
      </button>
    </div>
  )
}