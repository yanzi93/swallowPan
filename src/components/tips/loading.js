import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import './loading.css'

export class ToastLoading extends Component {
  render() {
    return (
      <div className="align loading">
        <ActivityIndicator size="large" />
        <span style={{ marginTop: 8 }}>努力加载中...</span>
      </div>
    );
  }
}

export class ToastOffline extends Component {
  render() {
    return (
      <div className="align loading">
        <ActivityIndicator size="large" />
        <span style={{ marginTop: 8 }}>网络中断了-_-</span>
      </div>
    );
  }
}

export class ToastFail extends Component {
  render() {
    return (
      <div className="align loading">
        <ActivityIndicator size="large" />
        <span style={{ marginTop: 8 }}>页面丢失了-_-</span>
      </div>
    );
  }
}


export default {ToastLoading, ToastOffline, ToastFail}