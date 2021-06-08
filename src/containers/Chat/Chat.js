import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchChatStart} from "../../store/actions/chat";
import {sendCom} from "../../axios/axios-sof";
import ChatRooms from "../../components/ChatRooms/ChatRooms";
import './Chat.css'
import CustomScrollbar from "../../components/CustomScrollbar/CustomScrollbar";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import {getRooms, getRoomsDes} from "./chat.functions";

const Chat = ({screenType}) => {
  const dispatch = useDispatch()
  const {chrooms, chroomdes, chat, isRoomList} = useSelector((state) => state.chat);
  useEffect(() => {
    if (!chrooms) {
      dispatch(fetchChatStart());
      sendCom('chatmess !chroom? list')
    }
  }, [dispatch, chrooms]);

  const chRoom =
    <div className='ChatRoom'>
      <CustomScrollbar autoHide autoHideTimeout={500} autoHideDuration={200}>
        {screenType > 0
          ? <ChatMessages chat={chat}/>
          : (isRoomList) ? getRooms(chrooms, chroomdes) : [getRoomsDes(dispatch, chroomdes), <ChatMessages chat={chat}/>]
        }
      </CustomScrollbar>
    </div>

  return (
    <div className='Chat'>
      {screenType > 0
        ? <>
          <ChatRooms rooms={chrooms} roomDes={chroomdes}/>
          {chRoom}
        </>
        : {chRoom}
      }
    </div>
  )
}

export default Chat;
