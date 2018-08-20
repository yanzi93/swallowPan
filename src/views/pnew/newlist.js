import React, { Component } from 'react';
import SongList from '../common/songlist';

class NewList extends Component {
  render() {
    let {data} = this.props;
    return (
      <SongList songList={data}/>
    );
  }
}

export default NewList;
