import {
  FETCH_GAME_START,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_ERROR,
  RECIEVED_MAPPOINTS,
  FETCH_GMPD_SUCCESS
} from './actionTypes';


export function fetchGameStart() {
  return {
    type: FETCH_GAME_START,
    loading: true
  }
}

export function fetchGameSuccess(data) {
  return {
    type: FETCH_GAME_SUCCESS,
    loading: false,
    data
  }
}

export function fetchGmpdSuccess(gmData) {
  return {
    type: FETCH_GMPD_SUCCESS,
    loading: false,
    gmData
  }
}

export function fetchGameError(e) {
  return {
    type: FETCH_GAME_ERROR,
    error: e
  }
}

export function recievedMpt(mpt) {
  return {
    type: RECIEVED_MAPPOINTS,
    mpt
  }
}
