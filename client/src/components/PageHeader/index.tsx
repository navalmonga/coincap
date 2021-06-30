import React from 'react';
import { Link } from "react-router-dom";
import { StyledHeader, StyledTitle, LoginButton, Logo } from './style';

export type HeaderProps = {
  title: string,
}

const PageHeader = (props: HeaderProps) => {
  const { title } = props;
  const titleParts = title.split(' ');
  return (
    <StyledHeader>
      <LoginButton href="/">login</LoginButton>
      <Logo>
        <img src="/noun-vector.svg" alt="coincap svg" height="55px" />
        <Link to="/">
          <StyledTitle>{titleParts[0]}<span>{titleParts[1]}</span></StyledTitle>
        </Link>
      </Logo>
    </StyledHeader>
  );
}

export default PageHeader;