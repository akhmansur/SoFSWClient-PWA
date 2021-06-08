import {RECV_COMMANDS, RECV_SETTINGS} from './actionTypes';

export function fetchCommands(comms) {
  return {
    type: RECV_COMMANDS,
    comms
  }
}

export function fetchSettings(settings) {
  return {
    type: RECV_SETTINGS,
    settings
  }
}

