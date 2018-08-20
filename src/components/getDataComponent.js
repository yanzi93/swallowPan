import React, { Component } from 'react';
import {ToastLoading} from './tips/loading'

import servers from '../server';

export let getDataComponent = (serverName,params={}) => {
  return (Com) => {
    return class ComponentName extends Component {
      constructor(props) {
        super(props);
        this.state = {
          data: {},
          loading: true
        }
      }
      componentDidMount() {
        let p = params;
        if (typeof params === 'function'){
          p = params(this.props)
        }
        if (!servers[serverName]) {
          throw new Error('请求参数错误');
        }
        servers[serverName](p).then((data) => {
          this.setState({
            data: data,
            loading: false
          })
        })
      }
      render() {
        return (
           this.state.loading ? <ToastLoading /> :
           <Com data={this.state.data} {...this.props}/>
        );
      }
    }
  }
}



