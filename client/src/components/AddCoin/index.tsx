import React, { useContext } from 'react';
import { WatchListContext } from '../../contexts/watchListContext';
import { StyledButton, ButtonDropdown, DropdownButton } from './style';
import supportedCoins from '../../constants/supportedCoins';
import coinImgMap from '../../constants/coinImg';

export type PaneProps = {
  
}

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
        {supportedCoins.sort((e1: any, e2: any) => {
          if (e1.name < e2.name) return -1;
          if (e1.name > e2.name) return 1;
          return 0;
        }).map(coin => {
          return (
            <DropdownButton key={coin.code} onClick={() => handleButtonClick(coin.name.toLowerCase())}>
              <img src={coinImgMap.get(coin.name.toLowerCase())} alt={coin.name} />&nbsp;
              {coin.code}:&nbsp;
              {coin.name}
            </DropdownButton>
          )
        })}
      </ButtonDropdown>
    </StyledButton>
  );
}

export default AddCoin;