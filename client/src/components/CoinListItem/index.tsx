import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { StyledItem, ItemTicker, ItemTitle, MarketCap, DeleteIcon, VisContainer } from './style';
import { StyledButton } from '../AddCoin/style';
import { WatchListContext } from '../../contexts/watchListContext';
import moment from 'moment';
import coinImgMap from '../../constants/coinImg';
import CoinGecko from '../../apis/CoinGecko';
import { VisXChart } from '../../organisms';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const symbolMap = new Map([['binancecoin', 'BNB'],
                           ['bitcoin', '₿'],
                           ['bitcoin-cash', 'BCH'],
                           ['ethereum', 'Ξ'],
                           ['cardano', 'ADA'],
                           ['dogecoin', 'DOGE'],
                           ['the-graph', 'GRT'],
                           ['tether', '₮'],
                           ['ripple', 'XRP'],
                          ]);

const homepageMap = new Map([['bitcoin', 'https://bitcoin.org'], 
                            ['ethereum', 'https://ethereum.org'],
                            ['tether', 'https://tether.to'],
                            ['xrp', 'https://ripple.com'],
                            ['litecoin', 'https://litecoin.org'],
                            ['cardano', 'https://cardano.org'],
                            ['polkadot', 'https://polkadot.network'],
                            ['bitcoin cash', 'https://bitcoincash.org'],
                            ['dogecoin', 'https://dogecoin.com']]);                          

export type ListItemProps = {
  item: any,
  name: string,
  symbol: string,
  currency: {
    id: string,
    symbol: string,
  }
}
const abbreviate_number = (num: any, fixed: any) => {
  // https://stackoverflow.com/a/10601315
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}

const cardBoxShadow = `
0 2.8px 2.2px rgba(255, 255, 255, 0.034),
0 6.7px 5.3px rgba(255, 255, 255, 0.048),
0 12.5px 10px rgba(255, 255, 255, 0.06),
0 22.3px 17.9px rgba(255, 255, 255, 0.072),
0 41.8px 33.4px rgba(255, 255, 255, 0.086),
0 100px 80px rgba(255, 255, 255, 0.12)
`;

const Icon = styled.div`
  min-height: 36px;
  max-height: 36px;
  min-width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 0.3rem;
  -webkit-box-shadow: ${cardBoxShadow};
  -moz-box-shadow: ${cardBoxShadow};
  box-shadow: ${cardBoxShadow};
`

const CoinListItem = (props: ListItemProps) => {
  const { item, name, symbol, currency } = props;
  const { deleteCoin } = useContext(WatchListContext);
  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState({
    day: [],
  });

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

      const [day] = await Promise.all([
        coinGecko.get(`/coins/${symbol}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '1',
          },
        }),
      ]);

      setCoinData({
        day: formatChartData(day.data.prices),
      });

      setLoading(false);
    };

    fetchData();
  }, [symbol]);



  return (
    <StyledItem>
      <ItemTicker delta={item? item.usd_24h_change >= 0: false}>
        <span className="symbol">
          <Icon>
            <img className="coinLogo" src={coinImgMap.get(name.toLowerCase()) ?? 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg'} alt={name ?? 'loading...'} />
            <StyledButton className="grow" setJustify={true} href={homepageMap.get(name.toLowerCase())} target="_blank" rel="noopener noreferrer">whitepaper&nbsp;&#x2197;</StyledButton>
          </Icon>
          {/* <h3>{name.toUpperCase() ?? 'LOADING...'}</h3> */}
        </span>
        <span className="hChange">
          {symbolMap.get(name) ?? '---'}&nbsp;
          <span>{String(item? item.usd_24h_change.toFixed(2): 0)}%&nbsp;</span>
          {item && item.usd_24h_change.toFixed(2) <= 0 ? <span>&#8601;</span>: <span>&#8599;</span>}
        </span>
        <span className="last24">
          (LAST 24H)
        </span>
      </ItemTicker>
      <>
        <VisContainer>
          {!!loading && <div>Loading...</div>}
          {!!!loading && (
            <Link to={`/coin/${symbol}`}>
              <div style={{ height: '7rem', width: '100%' }}>
                <ParentSize>{({ width, height }: any) => 
                  <VisXChart
                    data={coinData}
                    width={width}
                    height={height}
                  />
                }
                </ParentSize>
              </div>
            </Link>
          )}
        </VisContainer>
      </>
      <ItemTitle>
        <div>
          <p>{currency.symbol}{item? item.usd.toFixed(3): 0}</p>
          <span>updated&nbsp;{moment.unix(item? item.last_updated_at: undefined).fromNow()}</span>
        </div>
      </ItemTitle>
      <MarketCap>
        <h4>market cap</h4>
        <span>{currency.symbol}{item? abbreviate_number(item.usd_market_cap, 0) ?? '---': ''}</span>
        <br/>
        <br/>
        <h4>volume (24h)</h4>
        <span>{currency.symbol}{item? abbreviate_number(item.usd_24h_vol, 0) ?? '---': ''}</span>
      </MarketCap>
      {/* <MarketCap>
        market cap:&nbsp;{abbreviate_number(item.market_cap, 0)}<br/>
        circulation:&nbsp;{abbreviate_number(item.circulating_supply, 0)}<br/>
        max supply:&nbsp;{item.max_supply?abbreviate_number(item.max_supply, 0):'n/a'}
      </MarketCap> */}
      <DeleteIcon
        onClick={(e) => {
          e.preventDefault();
          deleteCoin(name.toLowerCase());
        }}
      >&times;</DeleteIcon>
    </StyledItem>
  );
}

export default CoinListItem;