import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import {connect} from 'react-redux'
import classnames from 'classnames';


class Goback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '搜索'
    }
  };

  componentWillReceiveProps(nextProps) {
    let { headerTitle } = nextProps;
    this.setState({
      title: headerTitle
    })
  }

	render() {
    let {pathname} = this.props.location;
    let reg = pathname.search(/(^\/singer\/list\/(\d)*$)|(^\/search)/) ===-1 ? false: true;
		 return (
		 	<NavBar
      className={classnames({
        goback: true,
        'gradient-color': !reg,
        'boxshadow': reg
      })}
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => {
      	this.props.history.go(-1);
      }}
    >{this.state.title}</NavBar>
    )
	}
}
function mapState2Props(state) {
  return {
    headerTitle: state.headerTitle,
  }
}

export default connect(mapState2Props)(Goback);