import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

import UserForm from './UserForm';

export default class AuthScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
            <UserForm />
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}