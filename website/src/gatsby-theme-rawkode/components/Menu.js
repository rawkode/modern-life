import React from 'react';
import { Styled } from 'theme-ui';
import { Link } from 'gatsby';

const Menu = () => {
  return (
    <div>
      <Styled.a as={Link} to="/about">
        About
      </Styled.a>
      <br />
      <Styled.a as={Link} to="/articles">
        Articles
      </Styled.a>
      <br />
      <Styled.a as={Link} to="/public-speaking">
        Public Speaking
      </Styled.a>
    </div>
  );
};

export default Menu;
