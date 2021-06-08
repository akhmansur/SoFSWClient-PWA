import {Scrollbars} from "react-custom-scrollbars-2";
import React from "react";

const renderThumb = ({style, ...props}) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: 'rgba(35, 49, 86, 0.8)',
  };
  return <div style={{...style, ...thumbStyle}} {...props} />;
};

const CustomScrollbar = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

export default CustomScrollbar;
