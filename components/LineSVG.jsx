// LineSVG.js
import React from "react";
import Svg, { Line } from "react-native-svg";

const LineSVG = ({ style }) => {
  return (
    <Svg style={style} width="380" height="1" viewBox="0 0 320 1" fill="none">
      <Line x1="16" y1="0.5" x2="320" y2="0.5" stroke="#CAC4D0" />
    </Svg>
  );
};

export default LineSVG;
