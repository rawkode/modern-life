import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from 'react-avatar';
import { Styled } from 'theme-ui';
import { Link } from 'gatsby';
import SocialIcons from './SocialIcons';
import mediaqueries from '../styles/media';

const Sidebar = ({ navOpen, toggleSidebar }) => {
  console.log(`toggle is ${navOpen}`);
  return (
    <SidebarContainer navOpen={navOpen}>
      <SidebarToggle>
        <a onClick={() => toggleSidebar(!navOpen)}>&times;</a>
      </SidebarToggle>

      <SidebarLinks>
        <Styled.a as={Link} to="/blog">
          Blog
        </Styled.a>
      </SidebarLinks>
      <SidebarProfile>
        <Avatar githubHandle="rawkode" size={100} round="20px" />
        <h1>Rawkode</h1>
        <SocialIcons />
        <p>
          Hi! My name is <strong>David McKay</strong>, and I am a Software & Technology
          Professional, from Glasgow (Scotland), that is currently a Developer Advocate for
          InfluxData, a San Francisco based database company.
        </p>
      </SidebarProfile>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside`
  display: flex;
  flex: 0 0 100vw;
  height: 100vh;
  transform: ${p => (p.navOpen ? `translateX(0vw)` : `translateX(-100vw)`)};
  transition: transform 0.5s;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  padding-left: 1vw;
  padding-right: 1vw;

  background: ${p => p.theme.colors.sidebar};
  color: ${p => p.theme.colors.background};

  ${mediaqueries.desktop_up`
    position: fixed;
    width: 30vw;
    transform: none;
  `};
`;

const SidebarLinks = styled.aside`
  display: flex;
  flex: 1 1 30vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SidebarProfile = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SidebarToggle = styled.aside`
  position: fixed;
  top: 1vh;
  bottom: 0;
  left: 0;
  width: 100px;
  font-size: 36px;

  ${mediaqueries.desktop_up`
    display: none;
  `};
`;

Sidebar.propTypes = {
  navOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func
};

export default React.memo(Sidebar);
