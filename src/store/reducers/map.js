import {RECIEVED_MAPPOINTS} from '../actions/actionTypes';

const initialState = {
  mpt: []
}

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case RECIEVED_MAPPOINTS:
      const mpt = action.mpt? action.mpt : []
      return {
        ...state,
        mpt
      }
    default:
      return state
  }
}
