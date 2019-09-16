import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Styled } from 'theme-ui';
import { globalStyles } from '../styles';
import mediaqueries from '../styles/media';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, location }) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <Styled.root>
      <Global styles={globalStyles} />
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <SiteWrapper>
        <SiteContentWrapper>
          <Sidebar navOpen={navOpen} toggleSidebar={setNavOpen} />
          <SiteContent navOpen={navOpen}>{children}</SiteContent>
        </SiteContentWrapper>
      </SiteWrapper>
    </Styled.root>
  );
};

const SiteWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  background: '${p => p.theme.colors.background};'
  transition: background 0.25s var(--ease-in-out-quad);
`;

const SiteContentWrapper = styled.div`
  flex-grow: 1;
  min-width: 20rem;
`;

const SiteContent = styled.main`
  padding: 2rem 1rem 2rem;
  transition: 0.25s var(--ease-in-out-quad);
  opacity: ${p => (p.navOpen ? 0.3 : 1)};

  ${mediaqueries.desktop_up`
    transform: translateX(0);
    opacity: 1;
    padding: 7rem 3rem 3rem;
  `};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;
