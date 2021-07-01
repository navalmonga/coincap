import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { GlassPane, VisXChart } from '../organisms';
import { CoinChart } from '../components';
import { StyledTitle } from '../organisms/GlassPane/style';
import CoinGecko from '../apis/CoinGecko';
import coinImgMap from '../constants/coinImg';
const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone

export interface CDRouteParams {
  symbol: string;
}
const CoinLogo = styled.img`
  width: 72px;
  height: 72px;
  margin-bottom: 1rem;
`


const CoinDetail = () => {
  const { symbol } = useParams<CDRouteParams>();
  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState({
    day: [],
    week: [],
    year: [],
    detail: {},
  });
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  setInterval(
    () => { setTime(new Date().toLocaleTimeString())},
    1000
  );

  const formatChartData = (data: any) => {
    return data.map((e: any) => {
      return {
        t: e[0],
        y: e[1].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let coinGecko = CoinGecko;

      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${symbol}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '1',
          },
        }),
        coinGecko.get(`/coins/${symbol}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '7',
          },
        }),
        coinGecko.get(`/coins/${symbol}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '365',
          },
        }),
        coinGecko.get(`/coins/markets/`, {
          params: {
            vs_currency: 'usd',
            ids: symbol,
          },
        }),
      ]);

      setCoinData({
        day: formatChartData(day.data.prices),
        week: formatChartData(week.data.prices),
        year: formatChartData(year.data.prices),
        detail: detail.data[0],
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <GlassPane width="90vw" height="59.5vh" title={`${localTZ} ${time}`} footer={`© ${new Date().getFullYear()} naval monga`}>
      <CoinLogo src={coinImgMap.get(symbol)} alt={`${symbol} logo`} />
      <StyledTitle fontSize={36}><span>{symbol}</span></StyledTitle>
      {!!loading && <div>Loading...</div>}
      {!!!loading && (
        <>
          <div style={{ height: '20rem', width: '80%' }}>
            <ParentSize>{({ width, height }: any) => 
              <VisXChart
                data={coinData}
                width={width}
                height={height}
              />
            }
            </ParentSize>
          </div>
        </>
      )}
    </GlassPane>
  );
}

export default CoinDetail;