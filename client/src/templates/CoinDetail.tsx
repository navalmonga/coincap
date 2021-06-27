import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlassPane } from '../organisms';
import { StyledTitle } from '../organisms/GlassPane/style';
const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone

export interface CDRouteParams {
  symbol: string;
}

const CoinDetail = () => {
  const { symbol } = useParams<CDRouteParams>();
  let [time, setTime] = useState(new Date().toLocaleTimeString())
  setInterval(
    () => { setTime(new Date().toLocaleTimeString())},
    1000
  )
  return (
    <GlassPane width="75vw" height="80vh" title={`${localTZ} ${time}`} footer={`© ${new Date().getFullYear()} naval monga`}>
      <StyledTitle fontSize={25}>COIN: <span>{symbol}</span></StyledTitle>
    </GlassPane>
  );
}

export default CoinDetail;