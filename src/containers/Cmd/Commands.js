import React from 'react';
import CustomScrollbar from "../../components/CustomScrollbar/CustomScrollbar";
import {useSelector} from "react-redux";
import './Commands.css'
import {sendCom} from "../../axios/axios-sof";

const Commands = () => {
  const {comms, settings} = useSelector((state) => state.comms);
  return (
    <CustomScrollbar >
      {comms.map((elem, index) => {
        return <p className='command'
                  key={index}
                   onClick={() =>
                     sendCom(elem.kay._text)
                   }
        >{elem.ctxt._text}</p>
      })}
    </CustomScrollbar>
  )
};

export default Commands;
