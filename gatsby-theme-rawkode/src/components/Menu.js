import React from 'react';
import { Styled } from 'theme-ui';
import { Link } from 'gatsby';

const Menu = () => {
  return (
    <div>
      <Styled.a as={Link} to="/blog">
        Blog
      </Styled.a>
      <Styled.a as={Link} to="/about">
        About
      </Styled.a>
    </div>
  );
};

export default Menu;
