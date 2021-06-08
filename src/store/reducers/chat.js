import {
  CLEAR_CHAT,
  FETCH_CHAT_ERROR,
  FETCH_CHAT_START,
  FETCH_CHAT_SUCCESS, RECV_CHRDES, RECV_CHRLIST,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  chrooms: null,
  chat: null,
  isRoomList: false
}

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHAT_SUCCESS:
      const chatArr = state.chat? [action.chat, ...state.chat]: [action.chat]
      return {
        ...state,
        chat: chatArr,
        isRoomList: false
      }
    case CLEAR_CHAT:
      return {
        ...state,
        chat: null
      }
    case RECV_CHRLIST:
      return {
        ...state,
        isRoomList: true,
        chrooms: action.chrooms,
      }
    case RECV_CHRDES:
      return {
        ...state,
        chroomdes: action.chroomdes,
      }
    case FETCH_CHAT_ERROR:
      return {
        ...state,
      }
    default:
      return state
  }
}
