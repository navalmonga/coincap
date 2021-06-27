import { watch } from 'fs';
import React, { useContext, useEffect, useState } from 'react';
import CoinGecko from '../../apis/CoinGecko';
import { Currency, CoinListItem } from '../../components';
import { StyledList } from './style';

export type ListProps = {
  watchListLocal: any,
}

const CoinList = (props: ListProps) => {
  const { watchListLocal } = props;

  const [loading, setLoading] = useState(false);
  const [curr, setCurr] = useState({id: 'usd', symbol: '$'});
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    console.log(watchListLocal);
    setLoading(true);
    const fetchData = async () => {
      const response = await CoinGecko.get('/simple/price', {
        params: {
          ids: watchListLocal.join(','),
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
          include_last_updated_at: true,
        },
      });
      setCoins(response.data);
      console.log(response.data);
    }

    fetchData()
    setLoading(false);
  }, [watchListLocal]);
  return (
    <StyledList>
      {loading && (
        <span>Loading...</span>
      )}
      <Currency current={curr} setCurrent={setCurr} />
      {!loading && Object.keys(coins).length > 1 && (
        Object.keys(coins).sort().map((ticker: any) => {
          return (
            <CoinListItem key={ticker} item={coins[ticker]} name={ticker} symbol={ticker} currency={curr} />
          )
        })
      )}
      {!loading && Object.keys(coins).length === 1 && (
        <CoinListItem key={watchListLocal[0]} item={coins[watchListLocal[0]]} name={watchListLocal[0]} symbol={watchListLocal[0]} currency={curr} />
      )}
    </StyledList>
  );
}

export default CoinList;