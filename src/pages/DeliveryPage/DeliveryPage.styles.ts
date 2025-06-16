import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 24px;
  text-align: center;
  color: #21867a;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 12px;
  color: #2a9d8f;
`;

export const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
  color: #333;
`;

export const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 16px;
  color: #444;

  li {
    margin-bottom: 8px;
  }
`;
