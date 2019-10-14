import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';

export default ({ node }) => (
  <AbstractCard>
    <Styled.a as={Link} to={node.slug}>
      <Styled.h2>{node.title}</Styled.h2>
      <Styled.p>
        {node.startDate}
        {node.endDate ? ` - ${node.endDate}` : ''}: {node.city}, {node.country}{' '}
      </Styled.p>
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
