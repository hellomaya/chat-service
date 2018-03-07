import React, { Component } from 'react';
import { Table, Message, Input, Form } from 'semantic-ui-react';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';

const options = [
  { key: 'admin', text: 'Admin', value: 'admin' },
  { key: 'resident', text: 'Resident', value: 'resident' },
  { key: 'security', text: 'Security', value: 'security' },
]

const serviceLoginUrl = '/api/v1/users/create';

export default class UserBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      confirm: '',
      role: 'resident',
      success: false,
      error: false,
      message: '',
    }

    this.handler = null;
  }

  componentDidMount() {
  }

  onCreateUser = () => {

    this.setState({
      loading: true,
    });

    const { email, password, role } = this.state;

    fetch(serviceLoginUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(user);
        console.log(data);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      })
  }

  onShowError = (message) => {
    this.setState({
      error: true,
      message,
    });

    this.handler = setTimeout(() => {
      this.setState({
        error: false,
        message: '',
      });
      clearTimeout(this.handler);
    }, 1500);
  }

  onSubmit = () => {
    if (isEmpty(trim(this.state.email))) {
      this.onShowError('Email is required');
      return;
    }

    if (isEmpty(trim(this.state.password))) {
      this.onShowError('Password is required');
      return;
    }

    if (this.state.password !== this.state.confirm) {
      this.onShowError('Password is inconsistent');
      return;
    }

    this.onCreateUser();
  }

  onChangeValue = (name, value) => {
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  renderError = () => {
    if (this.state.error) {
      return (
        <Message
          error
          content={this.state.message}
        />
      );
    }

    return (
      <Message
        success
        content={this.state.message}
      />
    );
  }

  render() {
    return (
      <div>
        <Form
          style={{ maxWidth: 350 }}
          error={this.state.error}
          success={this.state.success}
          onSubmit={this.onSubmit}
        >
          <Form.Group inline>
            <Form.Input icon='search' placeholder='Search mail...' />
            <Form.Select
              options={options}
              placeholder='-- Roles --'
              value={this.state.role}
            />
          </Form.Group>
        </Form>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Mail</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>Requires call</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Denied</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row warning>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell positive>Approved</Table.Cell>
              <Table.Cell warning>Requires call</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell negative>Denied</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}