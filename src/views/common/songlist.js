import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd-mobile'
import {connect} from 'react-redux'
import './songlist.css'

const Item = List.Item;

class SongList extends Component {
  static defaultProps = {
    songList:[]
  };
  static propTypes = {
    songList: PropTypes.array.isRequired
  };
  render() {
    let {songList} = this.props;
    return (
      <List className="common-list">
      {
        songList.map((item) => {
          return (
            <Item 
              extra={<i 
                className="iconfont icon-jinzhixiazai no-download-icon" 
              ></i>} 
              key={item.hash}
              onClick={()=>{
                this.props.dispatch({type: 'updateHash', hash: item.hash});
                this.props.dispatch({type: 'updateSongList', songList: songList});
              }}
            >
              {item.filename}
            </Item>)
        })
      }
      </List>
    );
  }
}

export default connect()(SongList);
