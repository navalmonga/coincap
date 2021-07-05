import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Theme from '../../styles/theme';

const cardBoxShadow = `
0 2.8px 2.2px rgba(255, 255, 255, 0.034),
0 6.7px 5.3px rgba(255, 255, 255, 0.048),
0 12.5px 10px rgba(255, 255, 255, 0.06),
0 22.3px 17.9px rgba(255, 255, 255, 0.072),
0 41.8px 33.4px rgba(255, 255, 255, 0.086),
0 100px 80px rgba(255, 255, 255, 0.12)
`;

export const StyledItem = styled.div`
  width: 100%;
  max-height: 8rem;
  margin-bottom: 2rem;
  background: ${Theme.gradients.primaryTransparent};
  -webkit-box-shadow: ${cardBoxShadow};
  -moz-box-shadow: ${cardBoxShadow};
  box-shadow: ${cardBoxShadow};
  border-radius: 0.25rem;
  padding: 2rem 1rem;
  color: ${Theme.layout.primaryColor};
  display: flex;
  flex: 1;
  align-items: center;
`;

export const ItemTicker = styled.div<{ delta: boolean }>`
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  height: 90%;
  font-weight: 700;
  .symbol {
    width: 100%;
    font-size: 1.3rem;
    align-items: center;
    .coinLogo {
      max-height: 22px;
      width: 22px;
      margin-left: 8px;
      flex: 0.2;
      object-fit: contain;
      z-index: 1;
      opacity: 1;
    }
  }
  .hChange {
    font-size: 21px;
    font-weight: 700;
    margin-top: 8px;
  }
  .last24{
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 400;
  }
  flex: 0.8;
  ${props => props.delta ? `
    color: ${Theme.palette.success};
  `: `
    color: ${Theme.palette.error};
  `}
`;

export const ItemTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  flex: 0.8;
  height: 100%;
  h3 {
    letter-spacing: 0.13rem;
    font-size: 1.1rem;
    font-weight: 700;
    z-index: 2;
    margin-left: 1rem;
  }
  span {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 400;
  }
  div {
    display: flex;
    flex-direction: column;
    p {
      font-size: 1.3rem;
      font-weight: 700;
      flex: 0.5;
    }
    span {
      flex: 0.5;
      font-size: 11px;
    }
  }
`;

export const MarketCap = styled.p`
  height: 100%;
  margin-top: -0.5rem;
  font-size: 15px;
  text-transform: uppercase;
  flex: 0.8;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  span {
    margin-top: -0.8rem;
  }
`;

export const DeleteIcon = styled.span`
  width: 1.3rem;
  height: 1.3rem;
  font-size: 1rem;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-left: 1rem;
  margin-top: -8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.layout.primaryColor};
  color: #111111;
  &:hover {
    cursor: pointer;
    background-color: #ed1c24;
    border-color: #ed1c24;
    color: ${Theme.layout.primaryColor};
  }
`;

export const VisContainer = styled.div`
  width: 20%;
  height: 100%;
  margin: 0 1rem;
`;