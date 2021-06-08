import React from 'react';
import './Map.css'
import Canvas from "../Canvas/Canvas";
import getImage from "./images";
import {shallowEqual, useSelector} from "react-redux";
const mapC = [];
const mapP = [];

const Map = React.memo(({points, emoji}) => {
  const {mpt} = useSelector((state) => state.map, shallowEqual);
  mpt.forEach((elem) => {
    mapC.push(elem._attributes.x + ':' + elem._attributes.y)
    mapP.push(elem._attributes.c)
  })
  const draw = (canvas, ctx, code, x, y) => {

      if (mapC.indexOf(x + ':' + y) < 0) {
        mapC.push(x + ':' + y)
        mapP.push(code)
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sImg = new Image()
      const cx = parseInt(x)
      const cy = parseInt(y)
      let tx, ty
      sImg.src = getImage('s01')
      const rz = 16;
      const hmc = Math.round((canvas.width / 2) - 1);
      const vmc = Math.round(canvas.height / 2);
      const hdc = hmc / rz;
      const vdc = vmc / rz;

      for (let i = (-1 * hdc - 1); i <= hdc; i++) {
        for (let j = (-1 * vdc); j <= vdc + 1; j++) {
          tx = Math.round(cx + i).toString()
          ty = Math.round(cy + j).toString()
          let pt = mapC.indexOf(tx + ':' + ty)
          if (pt > -1) {
            const img = new Image()
            img.onload = function () {
              ctx.drawImage(img, hmc + i * rz, vmc - j * rz);
            }
            img.src = getImage(mapP[pt])
          }
        }
      }
      ctx.globalCompositeOperation = 'lighten';
      ctx.font = '16px serif'
      ctx.strokeText(emoji, hmc - 7 , vmc + 10, 40);
  }
  return (
    <div className='Map'>
      <Canvas draw={draw} points={points} />
    </div>
  )
})
export default Map;
