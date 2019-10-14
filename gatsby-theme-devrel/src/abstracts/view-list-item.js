import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';

export default ({ title, uri }) => (
  <AbstractCard>
    <Styled.a as={Link} to={uri}>
      <Styled.h2>{title}</Styled.h2>
    </Styled.a>
  </AbstractCard>
);

const AbstractCard = styled.div`
  border: 1px dashed black;
  transition: 0.3s;
  padding: 1em;

  &:hover {
    box-shadow: 2px 8px 16px 2px rgba(0, 0, 0, 0.6);
  }
`;
