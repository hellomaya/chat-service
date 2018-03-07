import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import AuthScreen from './auth/AuthScreen';
import AdminScreen from './admin/AdminScreen';

import { observer } from 'mobx-react';

@observer
class App extends Component {

  renderAuth = () => {
    return <AuthScreen />
  }

  render() {
    return this.renderAuth();

    return (
      <div>
        <AdminScreen />
      </div>
    );
  }
}

export default App;
