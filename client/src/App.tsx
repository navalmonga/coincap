import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components';
import { CoinDetail, CoinSummary } from './templates';
import GlobalStyle from './styles/global-styles';
import { WatchListContextProvider } from './contexts/watchListContext';

function App() {
  return (
    <>
    <GlobalStyle />
    <div className="App">
      <WatchListContextProvider>
        <BrowserRouter>
          <Header title="coin price" />
          <Route exact path="/" component={CoinSummary} />
          <Route path="/coin/:symbol" component={CoinDetail} />
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
    </>
  );
}

export default App;
