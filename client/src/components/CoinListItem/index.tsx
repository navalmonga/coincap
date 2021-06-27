import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { StyledItem, ItemTicker, ItemTitle, MarketCap, DeleteIcon } from './style';
import { StyledButton } from '../AddCoin/style';
import { WatchListContext } from '../../contexts/watchListContext';
import moment from 'moment';

const symbolMap = new Map([['bitcoin', '₿'],
                           ['ethereum', 'Ξ'],
                           ['dogecoin', 'DOGE'],
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

const imgMap = new Map([['bitcoin', 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg'], 
                            ['ethereum', 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ethereum_Classic_Logo.svg'],
                            ['tether', 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=009'],
                            ['xrp', 'https://ripplex.io/assets/images/home-hero-ripplex.svg'],
                            ['litecoin', undefined],
                            ['dogecoin', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Dogecoin_Logo.png/150px-Dogecoin_Logo.png'],
                            ['bitcoincash', undefined]]);                            

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

const CoinListItem = (props: ListItemProps) => {
  const { item, name, symbol, currency } = props;
  // const { deleteCoin } = useContext(WatchListContext);
  return (
    <StyledItem to="/">
      <ItemTicker delta={item? item.usd_24h_change >= 0: false}>
        <span>{symbolMap.get(name) ?? '---'}</span>&nbsp;  
        <br/><br/>{item && item.usd_24h_change < 0 ? <span>&darr;</span>: <span>&uarr;</span>}&nbsp;{String(item? item.usd_24h_change: 0)}%
      </ItemTicker>
      <ItemTitle>
        <img src={imgMap.get(name.toLowerCase())?imgMap.get(name.toLowerCase()):'/'} alt={name} />&nbsp;
        {name.toUpperCase()}<br/>
      </ItemTitle>
      <ItemTitle>
        <div>
          <p>{currency.symbol} {item? item.usd: 0} {currency.id.toUpperCase()}</p>
          <span>updated&nbsp;{moment.unix(item? item.last_updated_at: undefined).fromNow()}</span>
        </div>
      </ItemTitle>
      <MarketCap>
        market cap<br/>
        {currency.symbol}{item? abbreviate_number(item.usd_market_cap, 0) ?? '---': ''}<br/>
        <hr/>
        volume<br/>
        {currency.symbol}{item? abbreviate_number(item.usd_24h_vol, 0) ?? '---': ''}
      </MarketCap>
      {/* <MarketCap>
        market cap:&nbsp;{abbreviate_number(item.market_cap, 0)}<br/>
        circulation:&nbsp;{abbreviate_number(item.circulating_supply, 0)}<br/>
        max supply:&nbsp;{item.max_supply?abbreviate_number(item.max_supply, 0):'n/a'}
      </MarketCap> */}
      <StyledButton className="grow" setJustify={true} href={homepageMap.get(name.toLowerCase())} target="_blank" rel="noopener noreferrer">whitepaper&nbsp;&#x2197;</StyledButton>
      <DeleteIcon
        onClick={(e) => {
          e.preventDefault();
          // deleteCoin(item.id.toLowerCase());
          console.log('delete');
        }}
      >&times;</DeleteIcon>
    </StyledItem>
  );
}

export default CoinListItem;