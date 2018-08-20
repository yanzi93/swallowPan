import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';


import './playbottom.css';
import {parseLyric} from './parseLyric';

import { getSongMp3, getRc } from '../../server/searchMp3';
import PlayerMask from './player/playermask';
import playerBg from '../../style/img/player-bg1.png';

class PlayBottom extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.state = {
      isShowMask: false,
      isPlay: false,
      duration: 1,
      currentTime: 0,
      playInfo: {
        imgUrl:playerBg,
        songName: 'music'
      },
      index: 0,
      rc: []
    }
  }
  getSongInfoMethodByHash = (hash,songList) => {
    songList = this.props.songList.length ? this.props.songList : songList;
    let index = songList.findIndex(item => item.hash === hash);
    if (hash) {
      getSongMp3({ hash }).then(({ data }) => {
        this.setState({
          playInfo: data,
          index: index,
          isPlay: true
        })
      })


    }
  }
  getRcMethodByHash = (hash,keyworld) => {
    if (hash) {
      getRc({ hash:hash, keyworld:keyworld }).then(({ data }) => {
        let rc = parseLyric(data);
        this.setState({
          rc: rc
        })
      })

    }
  }

  onLoadedMetadata = () => {
    this.setState({
      duration: this.audio.current.duration
    })
  }

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.audio.current.currentTime
    })
  }

  updateCurrentTime = (t) => {
    this.setState({
      currentTime: t
    })
    this.audio.current.currentTime = t;
  }

  playOrPause = () => {
    let audio = this.audio.current;
    if (audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  prevSong = () => {
    let index = this.state.index;
    index--;
    if (index < 0) {
      index = this.props.songList.length - 1;
    }
    let hash = this.props.songList[index].hash;
    this.getSongInfoMethodByHash(hash);
    this.getRcMethodByHash(hash)
  }
  nextSong = () => {
    let index = this.state.index;
    index++;
    if (index > this.props.songList.length-1) {
      index = 0;
    }
    let hash = this.props.songList[index].hash;
    this.getSongInfoMethodByHash(hash);
    this.getRcMethodByHash(hash)
  }
  changeShowMask = () => {
    this.setState({
      isShowMask: false
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('props改变了')
    let { hash,songList } = nextProps;
    this.getSongInfoMethodByHash(hash,songList);
    this.getRcMethodByHash(hash)
  }



  render() {
    let {playInfo} = this.state;
    return  ReactDOM.createPortal(
      <div className="play-bottom">
        <audio
          autoPlay src={playInfo.url}
          onLoadedMetadata={this.onLoadedMetadata}
          onTimeUpdate={this.onTimeUpdate}
          onEnded={this.nextSong}
          ref={this.audio}
        >
        </audio>
        <div 
          className="play-left" 
          onClick={()=>this.setState({isShowMask: true})}>
          <img 
          src={playInfo.imgUrl && playInfo.imgUrl.replace('{size}', 240)} 
          alt={playInfo.singerName}
          />

          <p>
            <span>{playInfo.songName}</span>
            <span>{playInfo.singerName}</span>
          </p>
        </div>
        <div className="play-right">
          <div 
            className="iconfont play-prev icon-zuizuo"
            onClick={this.prevSong}
          ></div>
          <div 
           className={classnames({
              iconfont: true,
              'playing-btn': true,
              'icon-bofang': !this.state.isPlay,
              'icon-zanting': this.state.isPlay
            })}
            onClick={this.playOrPause}
          ></div>
          <div 
            className="iconfont play-next icon-zuiyou"
            onClick={this.nextSong}
          ></div>
        </div>
        
          <PlayerMask
              playOrPause={this.playOrPause} 
              prevSong={this.prevSong}
              nextSong={this.nextSong}
              isPlay={this.state.isPlay}
              updateCurrentTime={this.updateCurrentTime}
              duration={this.state.duration}
              imgUrl={playInfo.imgUrl}
              currentTime={this.state.currentTime}
              rc={this.state.rc}
              changeShowMask={this.changeShowMask}
              showStatus={this.state.isShowMask }
          /> 
        
      </div>
    ,document.body)
  }
}

function mapState2Props(state) {
  return {
    hash: state.hash,
    songList: state.songList
  }
}
export default connect(mapState2Props)(PlayBottom);


// {
//           this.state.isShowMask 
//           ? <PlayerMask
//               playOrPause={this.playOrPause} 
//               prevSong={this.prevSong}
//               nextSong={this.nextSong}
//               isPlay={this.state.isPlay}
//               updateCurrentTime={this.updateCurrentTime}
//               duration={this.state.duration}
//               imgUrl={playInfo.imgUrl}
//               currentTime={this.state.currentTime}
//               rc={this.state.rc}
//               changeShowMask={this.changeShowMask}
//               showStatus={this.state.isShowMask }
//            /> 
//           : null
//         }
