import React, { Component } from 'react'


export default class Lyrcc extends Component {
  constructor(props) {
    super(props);
    this.state={
      curIndex: 0,
      pMid: 3,
      moveIndex: 0
    }
  }
  posRcTop = (cT,rc) => {
    let curIndex = 0;
    for (let i=0, len=rc.length; i<len; i++) {
      if(cT > rc[i][0]){
        curIndex = i;
      }else {
        break;
      }
    }
    let moveIndex = curIndex > this.state.pMid ? curIndex - this.state.pMid : 0;
    let top = -moveIndex + 'rem';
    return {
      curIndex,
      top
    };
  };

  render() {
    let {currentTime, rc} = this.props;
    let computed = this.posRcTop(currentTime,rc);
    return (
      <div className="m-lyric-area">
      {
        <div className="m-lyric" style={{top: computed.top}}>
        {rc.length ? rc.map((item,index) => {
                        let cls = index===computed.curIndex? 'active' : '';
                        return <p 
                          key={item[0]}
                          className={cls}
                          index={index}
                        >
                        {item[1]}
                        </p>
                      }) : <p>歌单为空</p>
        }
        </div>
      }
      </div>
    )
  }
}

// {rc.length
  // } : <p>'歌单无内容'</p>

  // {
  //           rc.map((item,index) => {
  //             let cls = index===computed.curIndex? 'active' : '';
  //             return <p 
  //               key={item[0]}
  //               className={cls}
  //               index={index}
  //             >
  //             {item[1]}
  //             </p>
  //           })
