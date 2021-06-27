import React, { useContext } from 'react';
import { WatchListContext } from '../../contexts/watchListContext';
import { StyledButton, ButtonDropdown, DropdownButton } from './style';

export type PaneProps = {
  
}

const supportedCoins = [{code: 'GRT', name: 'the-graph'}, {code: 'BTC', name: 'bitcoin'}, {code: 'ETH', name: 'ethereum'}, {code: 'XRP', name: 'ripple'}, {code: 'LTC', name: 'litecoin'}, {code: 'USDT', name: 'tether'}, {code: 'DOGE', name: 'dogecoin'}, {code: 'BCH', name: 'bitcoin-cash'}];

const AddCoin = (props: PaneProps) => {
  // const {  } = props;
  const { addCoin } = useContext(WatchListContext);

  const handleButtonClick = (coin: any) => {
    console.log(`add ${coin}`)
    addCoin(coin);
  }

  return (
    <StyledButton setAlign={true}>
      add coin&nbsp;+
      <ButtonDropdown>
        {supportedCoins.map(coin => {
          return <DropdownButton key={coin.code} onClick={() => handleButtonClick(coin.name.toLowerCase())}>{coin.code}:&nbsp; {coin.name}</DropdownButton>
        })}
      </ButtonDropdown>
    </StyledButton>
  );
}

export default AddCoin;