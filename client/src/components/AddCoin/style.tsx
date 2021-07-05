import styled from 'styled-components';
import Theme from '../../styles/theme';

const cardBoxShadow = `
0 2.8px 2.2px rgba(255, 255, 255, 0.034),
0 6.7px 5.3px rgba(255, 255, 255, 0.048),
0 12.5px 10px rgba(255, 255, 255, 0.06),
0 22.3px 17.9px rgba(255, 255, 255, 0.072),
0 41.8px 33.4px rgba(255, 255, 255, 0.086),
0 100px 80px rgba(255, 255, 255, 0.12)
`;

export const StyledButton = styled.a<{ setAlign?: boolean, setJustify?: boolean }>`
  padding: 0.3rem 0.75rem;
  font-family: ${Theme.fonts.base};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: ${Theme.gradients.primary};
  background-repeat: repeat;
  color: ${Theme.layout.primaryColor};
  transition: all 0.18s linear;
  border-radius: 0.33rem;
  &:hover {
    -webkit-box-shadow: ${cardBoxShadow};
    -moz-box-shadow: ${cardBoxShadow};
    box-shadow: ${cardBoxShadow};
    background-position: -6.25rem 0; /* change the direction of the change here */
    color: #fff;
    cursor: pointer;
    div {
      display: flex;
    }
  }

  ${props => props.setAlign === true ?
    `
    align-self: flex-start;
    position: sticky;
    top: 1rem;
    z-index: 99;
    `:''
  }
  ${props => props.setJustify === true ?
    `
    background: none;
    background-color: #f6f6f6;
    color: #111111;
    &:hover {
      color: #111111;
    }
    `:''
  }
`;

export const ButtonDropdown = styled.div`
  display: none;
  z-index: 100;
  position: absolute;
  left: 2rem;
  top: 1rem;
  overflow-y: scroll;
  background-color: #f9f9f9;
  min-width: 455px;
  max-height: 16rem;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 0.25rem;
  flex-direction: column;
`;

export const DropdownButton = styled.button`
  text-transform: uppercase;
  color: #111111;
  padding: 1rem;
  text-align: left;
  display: flex;
  &:hover {
    background-color: #e8e8e8;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1) !important;
  }
  img {
    flex: 0.2;
    height: 22px;
    width: 22px;
    margin: 0 15px;
  }
`;