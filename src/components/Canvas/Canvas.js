import React, { useRef, useEffect } from 'react'
import './Canvas.css'

const Canvas = React.memo(props => {

  const { draw, points, ...rest } = props
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const render = () => {
      draw(canvas, context, points.code, points.x, points.y)
    }
    render()
  }, [draw, points])

  return (
    <canvas className='canvas' ref={canvasRef} {...rest}/>
  )
})

export default Canvas;
