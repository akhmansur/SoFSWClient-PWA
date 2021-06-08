import {
  CLEAR_CHAT,
  FETCH_CHAT_ERROR,
  FETCH_CHAT_START, FETCH_CHAT_SUCCESS, RECV_CHRDES, RECV_CHRLIST,
} from './actionTypes';

export function fetchChatStart() {
  return {
    type: FETCH_CHAT_START,
    loading: true
  }
}

export function fetchChatError(e) {
  return {
    type: FETCH_CHAT_ERROR,
    error: e
  }
}

export function clrChat() {
  return {
    type: CLEAR_CHAT
  }
}

export function recvChroomDesSuccess(chroomdes) {
  return {
    type: RECV_CHRDES,
    loading: false,
    chroomdes
  }
}
export function recvChroomsSuccess(chrooms) {
  return {
    type: RECV_CHRLIST,
    loading: false,
    chrooms
  }
}

export function recvChat(chat) {
  return {
    type: FETCH_CHAT_SUCCESS,
    chat
  }
}

