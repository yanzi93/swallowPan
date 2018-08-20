import React, { Component } from 'react'
import {getDataComponent} from '../../components/getDataComponent'
import CustomCarousel from './customcarousel'
import NewList from './newlist'
import { ToastFail } from '../../components/tips/loading'
import './pnew.css'


class Pnew extends Component {
  render() {
  	let {banner, data} = this.props.data && this.props.data.data;
    return (
      data.length ? <div className="pnew">
        <CustomCarousel 
        banner={banner}
        autoplayInterval="5000"
         />
        <NewList data={data} />
      </div> : <ToastFail />
    );
  }
}

export default getDataComponent('getNewSongs')(Pnew);
