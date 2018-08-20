import React, { Component } from 'react'
import classnames from 'classnames'

export default class Controls extends Component {
	constructor(props) {
		super(props);
		this.progress = React.createRef();
		this.circle = React.createRef();
		this.state = {
			minX: 0,
			maxX: 0,
			isMove: false,
			l: 0
		}
	}

	addZero = (n) => {
		return n < 10 ? '0'+n : n;	
	}

	sToM = (d) =>{
    let m = this.addZero(parseInt(d/60, 10));
    let s = this.addZero(parseInt(d%60, 10));
    return m + ":" + s;
  }

	touchStart = () => {
		this.setState({
			isMove: true
		})
	}
	touchMove = (e) => {
		let react = this.progress.current.getBoundingClientRect().left;
    let l = e.changedTouches[0].pageX - react - this.circle.current.offsetWidth / 2
    if (l < this.state.minX) l = this.state.minX;
    if (l > this.state.maxX) l = this.state.maxX;
    this.setState({
      l:l
    });
	}
	touchEnd = () => {
		this.setState({
      isMove: false
    });
    if (this.props.updateCurrentTime){
      let t = this.circle.current.offsetLeft / this.state.maxX * this.props.duration;
      this.props.updateCurrentTime(t)
    }
	}
	progressStart = (e) => {
    this.touchMove(e);
    this.setState({
      isMove: true
    },() => {
      if (this.props.updateCurrentTime) {
        let t = this.circle.current.offsetLeft / this.state.maxX * this.props.duration;
        this.props.updateCurrentTime(t)
      }
    })
    
  }
  progressEnd = () => {
    this.setState({
      isMove: false
    })
  }
	componentDidMount() {
    this.setState({
      maxX: this.progress.current.clientWidth - this.circle.current.offsetWidth
    })
  }
  componentWillReceiveProps(nextProps){
    let l = this.props.currentTime / this.props.duration * this.state.maxX;
    if(!this.state.isMove){
      this.setState({
        l:l
      })
    }
  }

	render() {
    return (
      <div>
        <div className="m-bottom">
          <div className="m-progress-box">
            <span className="current-time">{this.sToM(this.props.currentTime)}</span>
            <div 
	            className="m-progress" 
	            ref={this.progress}
	            onTouchStart={this.progressStart}
              onTouchEnd={this.progressEnd}
            >
              <div className="m-progress-line">
                <div className="m-progress-lineed" style={{ width: this.state.l + 'px' }}></div>
              </div>
              <div 
	              className="m-progress-circle"
	              style={{left: this.state.l + 'px'}}
	              onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
                ref={this.circle}
              ></div>
            </div>
            <span className="total-time">{this.sToM(this.props.duration)}</span>
          </div>
          <div className="m-play-control">
            <div className="m-play-btn m-play-prev-btn iconfont icon-zuizuo"
            onClick={this.props.prevSong}
            ></div>
            <div
              className={classnames({
                'm-play-play-btn': true,
                iconfont: true,
                'icon-bofang': !this.props.isPlay,
                'icon-zanting': this.props.isPlay
              })}
              onClick={this.props.playOrPause}
            ></div>
            <div 
            className="m-play-btn iconfont icon-zuiyou"
            onClick={this.props.nextSong}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}