import React, { Component } from 'react'
import {getDataComponent} from '../../components/getDataComponent'
import { ToastFail } from '../../components/tips/loading'

import lozad from 'lozad'
import imgArrow from '../../style/img/arrorw-right.png'
import imgBg from '../../style/img/loading.gif'

import  './plist.css'

class Plist extends Component {
  componentDidMount(){
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  }
  render() {
    let {info=[]} = this.props.data && this.props.data.data &&this.props.data.data.plist.list
    return (
      <div className="plist">
      {
        info.length ? <ul className="list-wrapper">
        {
          info.map(item => {
            return (
              <li 
              className="list-item"
              key={item.specialid}
              onClick={()=>{this.props.history.push(`/plist/list/${item.specialid}`);}}
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
                <p>{item.specialname}</p>
                <span>
                  <i className="iconfont icon icon-jushoucanggift"></i>
                  {item.playcount}
                </span>
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

export default getDataComponent('getPlist')(Plist);
