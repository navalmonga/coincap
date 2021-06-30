import styled from 'styled-components';
import Theme from '../../styles/theme';

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 400;
    font-size: 15px;
  }
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0 auto;
  }
`;


export const StyledSelect = styled.select`
  padding: 0.5rem 0rem;
  border-radius: 0.25rem;
  color: ${Theme.layout.backgroundColor};
  border: none;
  margin: 0.25rem 0;
`;