import React, { Component } from 'react';
import {getDataComponent} from '../../components/getDataComponent';
import { ToastFail } from '../../components/tips/loading'
import { List } from 'antd-mobile';
import './singer.css';
const Item = List.Item;

class Singer extends Component {
  render() {
  	let {list=[]} = this.props.data && this.props.data.data;
    return (
      <div className="singer">
      {
        list.length ? <List className="class-list">
        {
          list.map((item)=>{
            return (
              <Item 
                key={item.classid} 
                arrow="horizontal" 
                onClick={() => {
                  this.props.history.push(`/singer/list/${item.classid}`)
                }}
              >
                {item.classname}
              </Item>)
          })
        }
        </List> : <ToastFail />
      }
        
      </div>
    );
  }
}

export default getDataComponent('getSingers')(Singer);
