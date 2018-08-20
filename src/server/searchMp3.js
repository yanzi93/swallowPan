import axios from 'axios'

let newRequset = axios.create({
  baseURL: '/kugou'
})

// http://www.kugou.com/yy/index.php?r=play/getdata&hash=57B83EAF673D77EE21009CBD8FD05BD6&album_id=8542768&_=1526050598106
// http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=9E8CE7AC9F2E4514BFB65E9C0BAE8782&from=mkugou

export const getSongMp3 = ({ hash = '' }) => {
  return newRequset('/app/i/getSongInfo.php', {
    responseType: 'json',
    params: {   // get请求的数据
      cmd: 'playInfo',
      hash: hash,
      from: 'mkugou'
    }
  })
}

// 歌词
export const getRc = ({ hash = '', keyword='' }) => {
  return newRequset('/app/i/krc.php', {
    params: {
      cmd: 100,
      keyword: keyword,
      hash: hash,
      timelength: 123
    }
  })
}




