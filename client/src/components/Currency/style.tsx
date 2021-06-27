import styled from 'styled-components';
import Theme from '../../styles/theme';

export const FlexRC = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

export const StyledLabel = styled.label`
  font-size: 14px;
  color: ${Theme.layout.primaryColor};
  text-transform: uppercase;
`


export const StyledSelect = styled.select`
  padding: 0.5rem 0rem;
  border-radius: 0.25rem;
  color: ${Theme.layout.backgroundColor};
  border: none;
  margin: 0.25rem 0;
`;