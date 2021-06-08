import React from 'react';
import './ChatRooms.css'
import {sendCom} from "../../axios/axios-sof";
import {clrChat} from "../../store/actions/chat";
import {useDispatch} from "react-redux";

const ChatRooms = ({rooms, roomDes}) => {
  const dispatch = useDispatch()
  return (
    <div className='chrooms'>
      <span className='title'>Комнаты:</span>
      {rooms
        ? getRooms(dispatch, rooms, roomDes)
        : ''}
    </div>
  )
};

function getRooms(dispatch, rooms, roomdes) {
  return rooms.map((elem, index) => {
    let isActive = ''
    if(elem.name._text === roomdes.name._text) {
      isActive = ' active'
    }
    return <button
      className={'roomButton' + isActive}
      alt={elem.des._text}
      key={index}
      onClick={() => {
        dispatch(clrChat())
        sendCom('chatmess !chroom! ' + elem.num._text)
        sendCom('chatmess !chroom? descr')
      }
      }
    >
      <span className='roomName'>{capitalize(elem.name._text) + ' (' + elem.incount._text + ' чел.)'}</span>
    </button>
  })
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ChatRooms;
