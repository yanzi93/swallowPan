import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getDataComponent } from '../../../components/getDataComponent'
import SongInfo from '../../common/songinfo'


class SingerInfo extends Component {
  componentDidMount() {
    let title = this.props.data.data.info.singername;
    this.props.dispatch({type: 'updateHeaderTitle', headerTitle: title});
  }
  render() {
  	let {songs,info} = this.props.data && this.props.data.data;
    let {list} = songs;
    return (
    	<div className="singer-info">
        <SongInfo data={list} info={info}/>
      </div>
    );
  }
}

export default connect()(getDataComponent('getSingerInfo', function(props){
  return { singerid: props.match.params.id }
})(SingerInfo));
