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
  @media (max-width: ${Theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
    min-height: 30rem;
  }
`;

export const ItemTicker = styled.h6<{ delta: boolean }>`
  padding-left: 1rem;
  font-size: 18px;
  span {
    font-size: 24px;
  }
  flex: 0.4;
  ${props => props.delta ? `
    color: ${Theme.palette.success};
  `: `
    color: ${Theme.palette.error};
  `}
`;

export const ItemTitle = styled.h6`
  font-size: 22px;
  flex: 0.5;
  display: flex;
  align-items: center;
  flex-direction: row;
  span {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 400;
  }
  img{
    height: 32px;
    width: auto;
    flex: 0.2;
    object-fit: contain;
  }
`;

export const MarketCap = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  flex: 0.5;
`;

export const DeleteIcon = styled.span`
  width: 2rem;
  height: 2rem;
  font-size: 20px;
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