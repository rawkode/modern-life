/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';

export default ({ title, tags, uri }) => {
  console.log('Tags: ' + tags);

  return (
    <AbstractCard>
      <Styled.a as={Link} to={uri}>
        {title}
      </Styled.a>
      <Styled.p>Tags: {tags.join(', ')}</Styled.p>
    </AbstractCard>
  );
};

const AbstractCard = styled.div`
  transition: 0.3s;
  padding: 1em;

  &:hover {
    box-shadow: 2px 8px 16px 2px rgba(0, 0, 0, 0.6);
  }
`;
