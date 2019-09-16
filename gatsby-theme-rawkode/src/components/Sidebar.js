import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from 'react-avatar';
import mediaqueries from '../styles/media';

const Sidebar = ({ navOpen, toggleSidebar }) => {
  console.log(`toggle is ${navOpen}`);
  return (
    <SidebarWrapper>
      <SidebarNav navOpen={navOpen}>
        <SidebarToggle>
          <a onClick={() => toggleSidebar(!navOpen)}>&times;</a>
        </SidebarToggle>
        <Avatar githubHandle="rawkode" size={100} round="20px" />
        <h1>Rawkode</h1>
        <p>
          Hi! My name is <strong>David McKay</strong>, and I am a Software & Technology
          Professional, from Glasgow (Scotland), that is currently a Developer Advocate for
          InfluxData, a San Francisco based database company.
        </p>
      </SidebarNav>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  font-size: 0.875rem;

  ${mediaqueries.desktop_up`
    width: 30vw;
    margin-: -30vw;
    flex: 0 0 30vw;
    margin-: 0;
  `};

  ${mediaqueries.phone`
    width: 100vw;
    margin-: -100vw;
    flex: 0 0 100vw;
  `};
`;

const SidebarNav = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  height: 100%;
  padding: 1rem 0;
  background: ${p => p.theme.colors.sidebar};
  transition: 0.25s var(--ease-in-out-quad);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  transition: 0.25s var(--ease-in-out-quad);
  transform: ${p => (p.navOpen ? null : `translateX(-100vw)`)};

  ${mediaqueries.desktop_up`
    width: 30vw;
    background: red !important;
    transform: translateX(0);
    padding: 6.6rem 0 1rem;
  `};
`;

const SidebarToggle = styled.aside`
  position: fixed;
  top: 1vh;
  bottom: 0;
  width: 100px;
  right: 1vw;
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
