import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';

export const StyledPane = styled.div<{ width?: string, height?: string }>`
  width: ${props => props.width} !important;
  height: ${props => props.height} !important;
  padding: 1rem 2rem;
  position: relative;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.3);
  background-attachment: fixed;
  border-radius: 0.25rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .2);
    filter: blur(10px);
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const StyledTitle = styled.h3<{ pushDown?:boolean; fontSize?:number; }>`
  text-transform: uppercase;
  color: ${Theme.layout.primaryColor};
  font-size: 12px;
  font-weight: 400;
  ${props => props.fontSize? 
    `
      font-size: ${props.fontSize}px;
      span {
        font-weight: 700;
      }
    `: 
    ''}
  ${props => props.pushDown? 
  `
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 1rem;
  `: 
  ''}
`;
