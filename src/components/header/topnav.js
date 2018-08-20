import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'


class TopNav extends Component {
  render() {
    return (
      <NavBar
        className="top-nav"
        mode="dark"
        leftContent={
          <i 
          className="iconfont icon-tubiaozhizuomoban logo-icon"
          ></i>
        }
        rightContent={[
          <Icon 
          key="0" 
          type="search" 
          style={{ marginRight: '16px' }} 
          onClick={()=>{this.props.history.push('/search/index')}}

          />,
        ]}
      >音乐馆</NavBar>
    );
  }
}

export default withRouter(TopNav)
