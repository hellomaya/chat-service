import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import UserForm from './UserForm';
import UserBrowser from './UserBrowser';

const panes = [
  { menuItem: 'BROWSE FEEDBACK', render: () => <Tab.Pane><UserBrowser /></Tab.Pane> },
];

const user = () =>
  <Tab panes={panes} />

export default user;