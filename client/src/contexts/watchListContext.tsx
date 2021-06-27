import React, { createContext, useState, useEffect } from 'react';

export interface WatchListContextData {
  watchList: any;
  addCoin: any;
  deleteCoin: any;
}
export const WatchListContext = createContext<WatchListContextData>({watchList: [], addCoin: [], deleteCoin: []});

export const WatchListContextProvider = (props: any) => {
  const { children } = props;
  console.log();
  localStorage.clear();
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || [
      'bitcoin',
      'ethereum',
      'dogecoin',
    ]
  );
  useEffect(() => {
    localStorage.setItem("watchList", watchList.join(','));
  });

  const addCoin = (coin: any) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
    }
  }

  const deleteCoin = (coin: any) => {
    setWatchList(
      watchList.filter(e => e !== coin)
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, addCoin, deleteCoin }}>
      {children}
    </WatchListContext.Provider>
  )
}