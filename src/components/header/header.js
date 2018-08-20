import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './header.css';

import TopNav from './topnav';
import Nav from './nav';
import Goback from './goback';
import { navConfig } from '../../router/config';


class Header extends Component {
  render() {
    let isShow = !!navConfig.find(item => this.props.location.pathname === item.path);

    return (
      <div className="header">
        <TopNav />
        {
          isShow ? <Nav navConfig={navConfig} {...this.props} /> : <Goback {...this.props} />
        }
      </div>
    );
  }
}

export default withRouter(Header);
