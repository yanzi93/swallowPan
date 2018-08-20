import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile';
import './search.css'

class Search extends Component {
  state = {
    value: '美食',
  };
  componentDidMount() {
    this.autoFocusInst.focus();
  }
  onChange= (value) => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
	render() {
		return (
			<div className="search">
				<SearchBar placeholder="搜索" ref={ref => this.autoFocusInst = ref} />
        <p className="tips">
          功能尚未开放<br/>
          敬请期待
        </p>
			</div>
		);
	}
}

export default Search