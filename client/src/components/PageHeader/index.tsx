import React from 'react';
import { Link } from "react-router-dom";
import { StyledHeader, StyledTitle, LoginButton } from './style';

export type HeaderProps = {
  title: string,
}

const PageHeader = (props: HeaderProps) => {
  const { title } = props;
  const titleParts = title.split(' ');
  return (
    <StyledHeader>
      <LoginButton href="/">login</LoginButton>
      <Link to="/">
      <StyledTitle>{titleParts[0]}<span>{titleParts[1]}</span></StyledTitle>
      </Link>
    </StyledHeader>
  );
}

export default PageHeader;