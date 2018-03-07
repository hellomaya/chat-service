import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import UserForm from './UserForm';
import UserBrowser from './UserBrowser';

const panes = [
  { menuItem: 'ADD USER', render: () => <Tab.Pane><UserForm /></Tab.Pane> },
  { menuItem: 'BROWSE USERS', render: () => <Tab.Pane><UserBrowser /></Tab.Pane> },
];

const user = () =>
  <Tab panes={panes} />

export default user;