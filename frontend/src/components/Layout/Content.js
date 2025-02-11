import React from 'react';
import styled from 'styled-components';
import MainMenu from '../Menu/MainMenu';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  h1 {
    color: ${props => props.theme.headerColor.color};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Content = ({ children }) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
  const nickname = userInfo.name || '[nickname]'; // name 값이 없을 경우 기본 닉네임 사용

  return (
    <ContentWrapper>
      <h1>{nickname}님의 미니홈피</h1>
      {children}
      <MainMenu />
    </ContentWrapper>
  );
};

export default Content;
