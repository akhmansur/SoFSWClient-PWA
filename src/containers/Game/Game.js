import React from 'react';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import './Game.css'
import './Loader.css'
import Map from "../../components/Map/Map";
import {useDispatch, useSelector} from "react-redux";
import {sendCom} from "../../axios/axios-sof";
import {fetchGameStart} from "../../store/actions/game";
import {addLog} from "../../store/actions/console";

function myEqual(first, second) {
  return JSON.stringify(first.gmData) === JSON.stringify(second.gmData)
}

const GameView = React.memo(() => {
  const dispatch = useDispatch()
  const {loading, gmData, perData, points} = useSelector((state) => state.game, myEqual);
  const sendCmd = (comm) => {
    dispatch(fetchGameStart())
    sendCom(comm)
  }
  let data = gmData
  if (data instanceof Array) {
    data = data ? data[0] : null
  } else {
    data = data ? data : null
  }
  const tl = (!loading && JSON.stringify(gmData) !== '{}')
  return (
    <React.Fragment>
      <div className='Game'>
        <div className='bars'>
          <ProgressBar
            icon={perData.php.hpdes}
            color={'hp'}
            current={perData.php.hp}
            max={perData.php.hpmax}/>
          <ProgressBar
            icon={perData.psp.spdes}
            color={'en'}
            current={perData.psp.sp}
            max={perData.psp.spmax}/>
          <ProgressBar
            icon={perData.ppt.pptdes}
            color={'xp'}
            current={perData.ppt.ppt}
            max={perData.ppt.pptmax}/>
        </div>
        <Map points={points} emoji={perData.emoji}/>
        <span className={'GameText'}>
            {perData.emoji}
          {perData.pname}
          {' ' + perData.plev.ldes + perData.plev.lev}
          {perData.atten ? ' Распределите характеристики!' : ''}
          </span>
        {loading
          ?
          <div className='loader'>
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          : tl ? getContent(dispatch, data, sendCmd) : ''}
      </div>
    </React.Fragment>
  )
})


function getCommButtons(dispatch, data, sendCom) {
  if (data instanceof Array) {
    return data.map((elem, index) => {
      dispatch(addLog(elem['kay']['_text'] + '- ' + elem['ctxt']['_text']))
      return <button
        className={'button'}
        key={index}
        onClick={() => {
          sendCom(elem['kay']['_text'])
        }
        }>
        {elem['ctxt']['_text']}
      </button>
    })
  } else {
    return <button className={'button'} onClick={() => sendCom(data['kay']['_text'])}>
      {data['ctxt']['_text']}
    </button>
  }
}

function getContent(dispatch, data, sendCom) {
  let content = (
    <span className='GameText'>Empty</span>
  )
  if (data) {
    data.text = data.text.length ? data.text : [data.text]
    content = (
      <div>
        {data.text.map((elem, index) => {
            if (elem.text) {
              dispatch(addLog(elem.text._text))
              return <p key={index} className='GameText'
                        dangerouslySetInnerHTML={
                          {__html: elem.text._text.replace(/\r\n/g, '<br/>')}}/>
            } else {
              const text = elem._text
              dispatch(addLog('-----------------------------------------------'))
              dispatch(addLog(text))
              return <p key={index} className='GameText'
                        dangerouslySetInnerHTML={
                          {__html: text? text.replace(/\r\n/g, '<br/>') : ''}}/>
            }
          })
        }
        <div className='buttons'>
          {getCommButtons(dispatch, data['comm'], sendCom)}
        </div>
      </div>
    )
  }
return content
}

export default GameView;
