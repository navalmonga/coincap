import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Theme from '../../styles/theme';

export const StyledItem = styled(Link)`
  width: 100%;
  max-height: 8rem;
  margin-bottom: 2rem;
  background: ${Theme.gradients.primaryTransparent};
  box-shadow: rgba(17, 0, 102, 0.16) 0px 16px 20px;
  border-radius: 0.25rem;
  padding: 1rem;
  color: ${Theme.layout.primaryColor};
  display: flex;
  flex: 1;
  align-items: center;
`;

export const ItemTicker = styled.h6<{ delta: boolean }>`
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  .symbol {
    display: flex;
    align-items: center;
    h3 {
      color: #fff;
    }
  }
  .hChange {
    font-size: 23px;
    margin-top: -1.5rem;
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

export const ItemTitle = styled.h6`
  font-size: 1rem;
  font-weight: 400;
  flex: 0.8;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 1rem;
  h3 {
    letter-spacing: 0.13rem;
    font-size: 1.1rem;
    font-weight: 700;
    z-index: 2;
    margin-left: 1rem;
  }
  .coinLogo {
    max-height: 36px;
    width: 36px;
    flex: 0.2;
    object-fit: contain;
    margin-top: 1rem;
    margin-bottom: -2rem;
    z-index: 1;
    opacity: 0.7;
  }
  span {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 400;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 19px;
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
  font-size: 15px;
  text-transform: uppercase;
  flex: 0.5;
`;

export const DeleteIcon = styled.span`
  width: 1rem;
  height: 1rem;
  font-size: 11px;
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
    background-color: #ed1c24;
    border-color: #ed1c24;
    color: ${Theme.layout.primaryColor};
  }
`;

export const VisContainer = styled.div`
  width: 20%;
  height: 100%;
  margin: 0 2rem;
`;