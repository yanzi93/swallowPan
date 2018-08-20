import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Icon } from 'antd-mobile';
import classnames from 'classnames';

import Lyirc from './lyirc';
import Controls from './controls'

class PlayerMask extends Component {
  render() {
    return ReactDOM.createPortal(
      <div 
      className="player-mask"
      className={classnames({
        'player-mask': true,
        'player-mask-active': this.props.showStatus
      })}
      >
        <img 
        className="bg-overlay"
        src={this.props.imgUrl && this.props.imgUrl.replace('{size}', 240)}
        alt='bg-img'
        />
        <div className="play-overlay"></div>
        <Icon type="left" 
          onClick={()=>{
            this.props.changeShowMask();
          }}
        />
        <Lyirc 
          currentTime={this.props.currentTime}
          rc={this.props.rc}
        />
        <Controls {...this.props}/>
      </div>,
      document.body
    )
  }
}

export default PlayerMask;
