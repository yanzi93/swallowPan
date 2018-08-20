import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {createStore} from 'redux'
import { Provider} from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css'; 
import './style/iconfont.css'
import Header from './components/header/header'
import Routes from './views/routes';
import PlayBottom from './components/playbottom/playbottom';
import reducers from './reducers/reducers'

import BScroll from 'better-scroll'
import './style/App.css'


let data = {
  hash: '',
  songList: []
}
let store = createStore(reducers,data);

class App extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  componentDidMount() {
    console.log('初始化BScroll')
    new BScroll(this.wrapper.current,{
      ScrollY: true,
      ScrollX: false,
      click: true,
      bounce: false
    });
  }
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
       <Header />
       <div className="content" >
         <div className="wrapper" ref={this.wrapper}>
           <div className="show-content">
           <Routes />
           </div>
         </div>
       </div>
       <PlayBottom />
      </div>
      </BrowserRouter>
      </Provider>
      
    );
  }
}

export default App;

// 