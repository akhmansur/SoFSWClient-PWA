import './ChatMessages.css'
import {sendCom} from "../../axios/axios-sof";
import React, {useState} from "react";
import {convertUnicode} from "../../containers/Chat/chat.functions";

const ChatMessages = ({chat}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [pos, setPos] = useState([])
  const [fields, setFields] = useState(['', '', ''])
  const [inputChat, setInputChat] = useState('');
  const [showField, setShowField] = useState(false);
  if (!chat) return <div/>;
  let mid = 2147483647
  return (
    <>
      {<p
        className='message'
        onClick={() => {
          sendCom('chatmess !history ' + mid.toString())
        }}>
        старые сообщения
      </p>}
      {
        chat.map((elem, index) => {
          if (mid > parseInt(elem.mid._text)) mid = parseInt(elem.mid._text)
          return (
            <p
              key={index}
              className={'message ' + elem.from._text}
              onClick={
                (event) => {
                  setFields([event.target.classList[1], fields[1], false])
                  setPos([event.target.offsetTop, event.target.offsetLeft, event.screenX])
                  setShowMenu(!showMenu)
                }
              }
            >
              <a
                style={{fontWeight: "bold"}}>
                {convertUnicode(elem.dtime._text + ' ' + elem.from._text)}</a><br/>{elem.mtext._text}
            </p>)
        })
      }
      {showMenu
        ? <div className="menu" style={{position: "absolute", top: pos[0] + 10, right: pos[1] + 40}}>
          <div className="menu-item" onClick={() => {
            setShowMenu(false)
            setFields([fields[0], fields[0], false])
            setShowField(true)
            }}
            key={'tonick'}
          >
            📌 Ник в сообщение
          </div>
          <div className="menu-item" onClick={
            () => {
              setShowMenu(false)
              setFields([fields[0], 'Приватно ' + fields[0], true])
              setShowField(true)
            }}
              key={'privmess'}
          >
            📧 Приватное сообщение
          </div>
          <div className="menu-item" onClick={() => {
            setShowMenu(false)
            sendCom('05 ' + fields[0])
            setShowField(true)
          }}
               key={'persinfo'}
          >
            👤 Информация о персонаже
          </div>
          <div className="menu-item" onClick={() => {
            setShowMenu(false)
            sendCom('chatmess !chroom? ulist')
            setShowField(true)
          }}
               key={'ulist'}
          >
            🔍 Кто здесь?
          </div>
          <div className="menu-item-last" onClick={() => {
            setShowMenu(false)
            setFields(['', '', false])
            setShowField(false)
          }}>
            🧹 Очистить поля
          </div>
        </div>
        : ''}
      {showField ? <p className='fields'>{fields[1]}</p> : ''}
      <div className='bottom-group'>
        <input
          className='chat-input'
          value={inputChat}
          onChange={event => setInputChat(event.target.value)}/>
        <button
          className='button-send'
          onClick={() => {
            setInputChat('')
            const isPrivate = fields[2] ? '!private ' : 'chatmess '
            sendCom(convertUnicode(isPrivate + fields[0] + ' ' + inputChat))
          }
          }>
          ▶
        </button>
      </div>
    </>
  )
};

export default ChatMessages;
