import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Config from '../router/config';

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
       {
         Config.map((item) => {
           return <Route exact key={item.path} path={item.path} component={item.component}/>
         })
       }
      </React.Fragment>
    );
  }
}

export default Routes;
