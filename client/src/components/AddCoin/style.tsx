import styled from 'styled-components';
import Theme from '../../styles/theme';

export const StyledButton = styled.a<{ setAlign?: boolean, setJustify?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  min-height: 2.5rem;
  font-family: ${Theme.fonts.base};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-repeat: repeat;
  color: ${Theme.layout.primaryColor};
  transition: all 0.18s linear;
  border-radius: 4rem;
  &:hover {
    // box-shadow: inset 0 0 20px rgba(255,255,255,0.2);
    background-position: -10rem -10rem; /* change the direction of the change here */
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
    top: 0;
    z-index: 2;
    `:''
  }
  ${props => props.setJustify === true ?
    `
    background: none;
    background-color: ${Theme.layout.primaryColor};
    color: #111111;
    margin-left: auto;
    &:hover {
      color: #111111;
    }
    `:''
  }
`;

export const ButtonDropdown = styled.div`
  display: none;
  z-index: 99;
  position: absolute;
  left: 2rem;
  top: 2rem;
  background-color: #f9f9f9;
  min-width: 455px;
  min-height: 10rem;
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