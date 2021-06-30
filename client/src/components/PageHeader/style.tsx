import styled from 'styled-components';
import Theme from '../../styles/theme';

export const StyledHeader = styled.header`
  text-align: center;
`;

export const StyledTitle = styled.h1`
  font-size: 20px;
  text-transform: uppercase;
  span{
    background: ${Theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const LoginButton = styled.a`
  position: absolute;
  z-index: 2;
  top: 0.75rem;
  right: 1rem;
  font-size: ${Theme.fonts.button};
  text-transform: uppercase;
`;

export const Logo = styled.section`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;