import React from "react";
import {clrChat} from "../../store/actions/chat";
import {sendCom} from "../../axios/axios-sof";
import {capitalize} from "../../Utils";



export function convertUnicode(input) {
  return input.replace(/\\u[0-9a-fA-F]{4}/g, function (a, b) {
    var charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
}

export function getRoomsDes(dispatch, roomDes) {
  if (!roomDes) return
  return (<p
      className='roomdes'
      onClick={() => {
        dispatch(clrChat())
        sendCom('chatmess !chroom? list')
      }}>
      {capitalize(roomDes.name._text) + ' (' + roomDes.incount._text + ' чел.)'}
      <br/>
      {roomDes.des._text}
    </p>
  )
}
export function getRooms(rooms, roomdes) {
  if (rooms)
    return rooms.map((elem, index) => {
      return <p
        className='message'
        alt={elem.des._text}
        key={index}
        onClick={() => {
          sendCom('chatmess !chroom! ' + elem.num._text)
          sendCom('chatmess !chroom? descr')
        }
        }
      >
        {capitalize(elem.name._text) + ' (' + elem.incount._text + ' чел.)'}
        <br/>
        {elem.des._text}
      </p>
    })
}
