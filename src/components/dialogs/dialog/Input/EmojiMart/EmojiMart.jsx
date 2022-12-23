import Picker from '@emoji-mart/react'
// import 'emoji-mart/css/emoji-mart.css'
import { useCallback, useEffect } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { useSelector,useDispatch } from 'react-redux'
import styles from './EmojiMart.module.css'
import {  dialogsUpdate, setShowEmoji } from '../../../../../Redux/reducers/dialogsReducer';

export default function EmojiMart({  messageInput,text }) {
  // извлекаем соответствующие методы из хранилища
const {showPreview,showEmoji}=useSelector(state=>state.dialogsPage.chat)
const   dispatch  = useDispatch()

  // обработчик нажатия клавиши `Esc`
  const onKeydown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        dispatch(setShowEmoji(false))
      }
    },
    [setShowEmoji]
  )

  

  // регистрируем данный обработчик на объекте `window`
  useEffect(() => {
    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])

  // метод для добавления эмодзи к тексту сообщения
  const onSelect = ({ native }) => {

    let withEmoji= text + native
    console.log(withEmoji);
    dispatch(dialogsUpdate(withEmoji))
    messageInput.current.focus()
  }

  return (
    <div className={styles.emoji}>
      <button
        className={styles.emojiButton}
        type='button'
        onFocus={(e) => {
            e.preventDefault()
            dispatch(setShowEmoji(!showEmoji))
            }}
        disabled={showPreview}
      >
        <BsEmojiSmile className='icon' />
      </button>
      {showEmoji && (
        <Picker
        onEmojiSelect={onSelect}
        emojiSize={20}
        showPreview={false}
        perLine={6}
        />
      )}
    </div>
  )
}