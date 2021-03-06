import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Styled } from 'theme-ui';
import { globalStyles } from '../styles';
import mediaqueries from '../styles/media';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <Styled.root>
      <Global styles={globalStyles} />

      <SiteWrapper>
        <Sidebar navOpen={navOpen} toggleSidebar={setNavOpen} />
        <SiteContentWrapper navOpen={navOpen}>
          <Header navOpen={navOpen} setNavOpen={setNavOpen} />
          <SiteContent>{children}</SiteContent>
        </SiteContentWrapper>
      </SiteWrapper>
    </Styled.root>
  );
};

const SiteWrapper = styled.div`
  display: flex;
  background: '${p => p.theme.colors.background};'
  transition: background 0.25s var(--ease-in-out-quad);
  overflow: hidden;
`;

const SiteContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s;
  transform: ${p => (p.navOpen ? `translateX(0vw)` : `translateX(-100vw)`)};

  ${mediaqueries.desktop_up`
    padding-left: 30vw;
    flex: 1 0 70vw;
    transform: none;
    overflow: hidden;
  `};
`;

const SiteContent = styled.main`
  width: 100vw;
  padding-top: 10vh;
  padding-left: 1vw;
  padding-right: 2vw;

  ${mediaqueries.desktop_up`
    width: 70vw;
  `};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
