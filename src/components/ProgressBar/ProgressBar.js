import React from 'react';
import './ProgressBar.scss'

const ProgressBar = React.memo(({icon, color, current, max}) => {
  const barWidth = ((current/max)*100) + '%'
  return (
    <div className='ProgressBar'>
      <div className={'bar ' + color} style={{width: barWidth <0 ? 0 : barWidth}}>
      </div>
      <span className='pbSpan'>
        {icon}{current}/{max}
      </span>
    </div>
  )
});

export default ProgressBar;
