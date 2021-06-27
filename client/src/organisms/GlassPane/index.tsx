import React from 'react';
import { StyledPane, StyledTitle } from './style';

export type PaneProps = {
  width: string,
  height: string,
  title: string,
  footer: string,
  children: any,
}

const GlassPane = (props: PaneProps) => {
  const { width, height, title, footer, children } = props;
  return (
    <StyledPane width={width} height={height}>
      <StyledTitle>{title}</StyledTitle>
      {children}
      <StyledTitle pushDown={true}>
        <span>{footer} | <a href="https://www.coingecko.com/en/api" aria-label="coingecko english api" target="_blank">data source</a></span>
        <br/>
        <a href="https://navalm.com" aria-label="navalm" target="_blank">navalm.com</a>
      </StyledTitle>
    </StyledPane>
  );
}

export default GlassPane;