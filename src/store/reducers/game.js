import {
  FETCH_GAME_SUCCESS,
  FETCH_GAME_START,
  FETCH_GAME_ERROR, FETCH_GMPD_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  gmData: {},
  perData: {
    atten: 0,
    emoji: '',
    plev: {
      ldes: 'y:',
      lev: '',
    },
    pname: '',
    php: {
      hpdes: '',
      hp: 0,
      hpmax: 0
    },
    psp: {
      spdes: '',
      sp: 0,
      spmax: 0
    },
    ppt: {
      pptdes: '',
      ppt: 0,
      pptmax: 0
    }
  },
  points: {
    code: 0,
    x: 0,
    y: 0
  },
  loading: false,
  error: null
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAME_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_GAME_SUCCESS:
      const pts = action.data['mess'][0]['point']
      const points = getPoints(pts)
      return {
        ...state,
        loading: false,
        gmData: action.data['mess'],
        points
      }
    case FETCH_GMPD_SUCCESS:
      return {
        ...state,
        perData: getPerdata(action.gmData['perdata']),
      }
    case FETCH_GAME_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

function getPerdata(data) {
  const isEmptyData = !isEmpty(data)
  if(data.length > 0) {
    data = data[0]
  }
  if (isEmptyData) {
    return {
      atten: data.atten._attributes.on,
      emoji: data.emoji._text,
      plev: {
        ldes: data.plev._attributes.ldes,
        lev: data.plev._attributes.lev,
      },
      pname: data.pname._text,
      php: {
        hpdes: data.php._attributes.hpdes,
          hp: data.php._attributes.hp,
          hpmax: data.php._attributes.hpmax
      },
      psp: {
        spdes: data.psp._attributes.spdes,
          sp: data.psp._attributes.sp,
          spmax: data.psp._attributes.spmax
      },
      ppt: {
        pptdes: data.ppt._attributes.ptdes,
          ppt: data.ppt._attributes.pt,
          pptmax: data.ppt._attributes.ptmax
      }
    }
  }
}

function getPoints(data) {
  if (data) {
  return {
      code: data._attributes.code,
      x: data._attributes.x,
      y: data._attributes.y
  }} else
    return {
      code: 0,
      x: 0,
      y: 0
    }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
