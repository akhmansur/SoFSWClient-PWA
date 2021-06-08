import React, {useState} from 'react';
import {sendCom} from "../../axios/axios-sof";
import {convertUnicode} from "../Chat/chat.functions";
import {useSelector} from "react-redux";
import CustomScrollbar from "../../components/CustomScrollbar/CustomScrollbar";
import './Console.css'

const Console = () => {
  const [input, setInput] = useState('');
  const {log} = useSelector(state => state.console)
  return (
    <>
      <CustomScrollbar autoHide autoHideTimeout={500} autoHideDuration={200}>
        {
          log.map((elem, index) => {
            return <p key={index} className='log' dangerouslySetInnerHTML={{__html: elem}}/>
          })
        }
      </CustomScrollbar>
      <div className='bottom-group'>
        <input
          className='input'
          value={input}
          alt='message'
          onChange={event => setInput(event.target.value)}/>
        <button
          className='button-send'
          onClick={() => {
            setInput('')
            sendCom(convertUnicode(input))
          }
          }>
          ▶
        </button>
      </div>
    </>
  )
}

export default Console;
