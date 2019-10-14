import React from 'react';
import { Styled } from 'theme-ui';
import { Link } from 'gatsby';

const Menu = () => {
  return (
    <div>
      <Styled.a as={Link} to="/blog">
        Blog
      </Styled.a>
      <br />
      <Styled.a as={Link} to="/about">
        About
      </Styled.a>
      <br />
      <Styled.a as={Link} to="/abstract">
        Public Speaking
      </Styled.a>
      <br />
      <Styled.a as={Link} to="/event">
        Events
      </Styled.a>
    </div>
  );
};

export default Menu;