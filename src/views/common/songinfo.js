import React, { Component } from 'react'
import SongList from './songlist'
import PropTypes from 'prop-types'
import './songinfo.css'


class SongInfo extends Component {
  static defaultProps = {
    data:[],
    info: {}
  };
  static propTypes = {
    data: PropTypes.array.isRequired,
    info: PropTypes.object.isRequired
  };
  render() {
  	let {data,info} = this.props;
    return (
    	<div className="song-info">
        <div className="song-info-img-wrapper">
           <img 
            className="song-info-img"
            src={info.imgurl && info.imgurl.replace('{size}',400)} 
            alt={info.singername}
          />
        </div>
        <div className="song-info-con">
          <SongList songList={data} ></SongList>
        </div>
      </div>
    );
  }
}

export default SongInfo
