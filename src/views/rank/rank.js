import React, { Component } from 'react'
import {getDataComponent} from '../../components/getDataComponent'
import { ToastFail } from '../../components/tips/loading'
import {connect} from 'react-redux'
import lozad from 'lozad'

import imgArrow from '../../style/img/arrorw-right.png'
import imgBg from '../../style/img/loading.gif'

import './rank.css'


class Rank extends Component {

  componentDidMount(){
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  }

  render() {
  	let {list=[]} = this.props.data && this.props.data.data && this.props.data.data.rank;
    return (
      <div className="rank">
      {list.length ? <ul className="list-wrapper">
        {
          list.map((item) => {
            return (
              <li 
              className="list-item"
              key={item.rankid}
              onClick={()=>{this.props.history.push(`/rank/info/${item.rankid}`);}}
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
                {item.rankname}
              </div>
              <div className="arrow-wrapper">
                <img src={imgArrow} alt="next" />
              </div>
              </li>
            )
          })
        }  
        </ul> : <ToastFail />
      }
      </div>
    );
  }
}
export default connect()(getDataComponent('getRankList')(Rank));
