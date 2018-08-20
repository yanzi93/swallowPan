import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getDataComponent } from '../../../components/getDataComponent'
import SongInfo from '../../common/songinfo'


class PlistInfo extends Component {
  componentDidMount() {
    let title = this.props.data.data.info.list.specialname;
    this.props.dispatch({type: 'updateHeaderTitle', headerTitle: title});
  }
  render() {
  	let {list,info} = this.props.data && this.props.data.data;
  	info = info && info.list;
  	list = list && list.list && list.list.info;
    return (
      <div className="plist-info">
        <SongInfo data={list} info={info}/>
      </div>
    );
  }
}

export default connect()(getDataComponent('getPlistInfo', function(props){
  return { plistid: props.match.params.id }
})(PlistInfo));
