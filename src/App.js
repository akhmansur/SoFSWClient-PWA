import React, {Fragment} from 'react';
import './App.css';
import GameView from "./containers/Game/Game";
import Commands from "./containers/Cmd/Commands";
import Chat from "./containers/Chat/Chat";
import Console from "./containers/Console/Console";
import SwipeableViews from "react-swipeable-views";
import {useMediaQuery} from 'react-responsive';
import {useDispatch} from 'react-redux';
import {fetchGameError, fetchGameSuccess, fetchGmpdSuccess, recievedMpt} from "./store/actions/game";
import {fetch_data, getArray} from "./axios/axios-sof";
import {recvChat, recvChroomsSuccess, recvChroomDesSuccess} from "./store/actions/chat";
import {fetchCommands} from "./store/actions/comms";


const styles = {
  slideDesktop: {
    width: '50vw',
    height: '100vh',
    minHeight: 300,
    color: '#fff',
  },
  slideBig: {
    width: '33vw',
    height: '100vh',
    minHeight: 300,
    color: '#fff',
  },
  slideMobile: {
    width: '100vw',
    height: '100vh',
    minHeight: 300,
    color: '#fff',
  }
};

const App = () => {
  const dispatch = useDispatch()
  let tick = 0
  setInterval(async () => {
    tick++
    const elem = getArray()
    if (elem) {
      try {
        tick = 0
        const res = await fetch_data(elem)
        respPars(res, dispatch)
      } catch (e) {
        dispatch(fetchGameError(e))
      }
    } else {
      if (tick === 4) {
        tick = 0
        const res = await fetch_data('000')
        respPars(res, dispatch)
      }
    }
  }, 1000)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  const internal = getContent(isDesktopOrLaptop, isBigScreen, isTabletOrMobile)
  return (
    <div className="App">
      {internal}
    </div>
  )
}


function getContent(isDesktopOrLaptop, isBigScreen, isTabletOrMobile) {
  if (isDesktopOrLaptop) {
    return (
      <Fragment>
        <SwipeableViews enableMouseEvents style={styles.slideDesktop}>
          <GameView/>
          <Commands/>
        </SwipeableViews>
        <SwipeableViews enableMouseEvents style={styles.slideDesktop}>
          <Chat screenType={1}/>
          <Console/>
        </SwipeableViews>
      </Fragment>
    )
  } else if (isBigScreen) {
    return (
      <Fragment>
        <SwipeableViews enableMouseEvents style={styles.slideBig}>
          <GameView/>
          <Commands/>
        </SwipeableViews>
        <SwipeableViews enableMouseEvents style={styles.slideBig}>
          <Chat screenType={1}/>
        </SwipeableViews>
        <SwipeableViews enableMouseEvents style={styles.slideBig}>
          <Console/>
        </SwipeableViews>
      </Fragment>
    )
  } else if (isTabletOrMobile) {
    return (
      <SwipeableViews enableMouseEvents style={styles.slideMobile}>
        <GameView/>
        <Commands/>
        <Chat screenType={-1}/>
        <Console/>
      </SwipeableViews>
    )
  }
}

function respPars(data, dispatch) {
  if (data) {
    const mess = data['resp']['mess']
    for (const mess1 of Object.keys(data['resp'])) {
      switch (mess1) {
        case 'mess':
          if (mess.isArray) {
            return dispatchTypes(dispatch, data['resp'], mess.length)
          } else {
            data['resp']['mess'] = new Array(mess)
            dispatchTypes(dispatch, data['resp'], 1)
          }
          break;
        case 'perdata':
          dispatch(fetchGmpdSuccess(data['resp']))
          break;
        case 'Commands':
          dispatch(fetchCommands(data['resp']['Commands']['comm']))
          break;
        case 'Settings':
          break;
        default:
          break;
      }
    }
  }
}

function dispatchTypes(dispatch, data, last) {
  if (data['mess'][0].length === 10) {
    data['mess'] = data['mess'][0]
    last = 10
  }
  for (let i = last-1; i >=0 ; i--) {
    switch (data['mess'][i]['_attributes'].type) {
      case 'game':
        dispatch(fetchGameSuccess(data))
        break;
      case 'mappoints':
        dispatch(recievedMpt(data['mess'][i]['mpt']))
        break;
      case 'chatroomdes':
        dispatch(recvChroomDesSuccess(data['mess'][i]))
        dispatch(fetchGmpdSuccess(data))
        break;
      case 'chatrooms':
        dispatch(recvChroomsSuccess(data['mess'][i]['chatroom']))
        dispatch(fetchGmpdSuccess(data))
        break;
      case 'chat':
        dispatch(recvChat(data['mess'][i]))
        break;
      default:
        break;
    }
  }
}

export default App;
