import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getDataComponent } from '../../../components/getDataComponent'
import SongInfo from '../../common/songinfo'

class RankInfo extends Component {
  componentDidMount() {
    let title = this.props.data.data.info.rankname;
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

export default connect()(getDataComponent('getRankInfo', function(props){
  return { rankid: props.match.params.id }
})(RankInfo));