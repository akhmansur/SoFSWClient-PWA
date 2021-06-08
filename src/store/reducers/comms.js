import {RECV_COMMANDS, RECV_SETTINGS} from '../actions/actionTypes';

const initialState = {
  comms: [],
  showSettings: false,
  settings: null
}

export default function commsReducer(state = initialState, action) {
  switch (action.type) {
    case RECV_COMMANDS:
      return {
        ...state,
        comms: action.comms
      }
    case RECV_SETTINGS:
      return {
        ...state,
        settings: action.settings
      }
    default:
      return state
  }
}
