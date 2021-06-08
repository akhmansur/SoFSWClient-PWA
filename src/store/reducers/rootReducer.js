import {combineReducers} from 'redux';
import gameReducer from './game';
import commsReducer from './comms';
import mapReducer from './map';
import chatReducer from './chat';
import consoleReducer from './console';

export default combineReducers({
  game: gameReducer,
  comms: commsReducer,
  chat: chatReducer,
  map: mapReducer,
  console: consoleReducer
})
