import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getDataComponent } from '../../../components/getDataComponent'
import './singerlist.css'
import lozad from 'lozad'
import imgBg from '../../../style/img/loading.gif'


class SingerList extends Component {
  componentDidMount() {
    let title = this.props.data.data.classname;
    this.props.dispatch({type: 'updateHeaderTitle', headerTitle: title});
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  }
  render() {
  	let {info:data} = this.props.data && this.props.data.data &&  this.props.data.data.singers && this.props.data.data.singers.list;
    console.log(data)
    return (
    	<div className="singer-list">
      <ul className="list-wrapper">
      {
      	data.map((item) => {
          return (
      		<li 
            className="list-item"
            key={item.singerid}
            onClick={()=>{this.props.history.push(`/singer/info/${item.singerid}`);}}
          >
            <div className="item-img-wrapper">
              <img 
              className="lozad"
              src={imgBg}
              alt=""
              data-src={item.imgurl && item.imgurl.replace('{size}',400)}
              />
            </div>
            <div className="item-con-wrapper">
              {item.singername}
            </div>
          </li>
          )
      	})
      }
      </ul>
      </div>
    );
  }
}

export default connect()(getDataComponent('getSingerList',function(props){
  return { classid: props.match.params.id }
})(SingerList));



// return (
//             <Item
//               key={item.singerid}
//               thumb={item.imgurl && item.imgurl.replace('{size}',240)}
//               arrow="horizontal"
//               onClick={() => {
//                 this.props.history.push(`/singer/info/${item.singerid}`)}}
//             >{item.singername}</Item>
//           )