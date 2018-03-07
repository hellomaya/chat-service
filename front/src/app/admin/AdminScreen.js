import React, { Component } from 'react';
import { Grid, Image, Menu, Segment, Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import User from './user';
import Feedback from './feedback';

export default class AuthScreen extends Component {
  state = {
    activeItem: 'bio',
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleItemClick = () => {
    this.setState({})
  }

  render() {
    return (
      <Router>
        <Grid style={{ padding: 10 }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <div>
                <Menu vertical fluid>
                  <Menu.Item>
                    <Menu.Item>
                      <Image src={require('../img/user.png')} size='medium' circular />
                      <p
                        style={{ textTransform: 'uppercase', marginTop: 20 }}
                      >
                        ADMIN
                      </p>
                      <p>
                        abc@gmail.com
                      </p>
                      <Button size='small' fluid primary>
                        Logout
                      </Button>
                    </Menu.Item>
                  </Menu.Item>
                  <Menu.Item>
                    <p
                      style={{ textTransform: 'uppercase' }}
                    >
                      <NavLink activeStyle={{ color: 'orange' }} to="/users">Manage users</NavLink>
                    </p>
                  </Menu.Item>
                  <Menu.Item>
                    <p
                      style={{ textTransform: 'uppercase' }}
                    >
                      <NavLink activeStyle={{ color: 'orange' }} to="/feedback">Manage feedback</NavLink>
                    </p>
                  </Menu.Item>

                </Menu>
              </div>
            </Grid.Column>
            <Grid.Column width={11}>
              <Segment vertical>
                <div>
                  <Route exact path="/" component={User} />
                  <Route path="/users" component={User} />
                  <Route path="/feedback" component={Feedback} />
                </div>
              </Segment>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={11}>
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
      </Router>
    );
  }

}