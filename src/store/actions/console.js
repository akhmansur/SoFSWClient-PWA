import {ADD_LOG} from './actionTypes';

export function addLog(log) {
  return {
    type: ADD_LOG,
    log
  }
}
