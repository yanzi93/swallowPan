import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

class Nav extends Component {
  render() {
    let {navConfig} = this.props;
    let initialPage = 0;
    initialPage = navConfig.findIndex((item) => {
      return item.path === this.props.location.pathname
    });
    return (
        <Tabs 
        className="nav-second"
        tabs={navConfig} 
        initialPage={initialPage}
        onChange={(tab, index)=>{
          this.props.history.push(tab.path);
        }}
        />
    );
  }
}

export default Nav;
