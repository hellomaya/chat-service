import React, { Component } from 'react';
import { Form, Button, Message, TextArea } from 'semantic-ui-react';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';

const options = [
  { key: 'admin', text: 'Admin', value: 'admin' },
  { key: 'resident', text: 'Resident', value: 'resident' },
  { key: 'security', text: 'Security', value: 'security' },
]

const serviceLoginUrl = '/api/v1/users/create';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      confirm: '',
      role: 'resident',
      address: '',
      success: false,
      error: false,
      message: '',
    }

    this.handler = null;
    this.handleSuccess = null;
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
        const {statusCode, description} = data;

        if (statusCode === 200) {

          this.onShowSuccess('User added successfully.');
          this.setState({
            loading: false,
          });
          return;
        }

        if (statusCode === 400) {

          this.onShowError(description);
          this.setState({
            loading: false,
          });
          return;
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      })
  }

  onShowSuccess = (message) => {
    this.setState({
      error: false,
      success: true,
      message,
    });

    this.handleSuccess = setTimeout(() => {
      this.setState({
        error: false,
        success: false,
        message: '',
      });
      clearTimeout(this.handleSuccess);
    }, 1500);
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
    }, 2500);
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
// console.log(value);
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
      <Form
        style={{ maxWidth: 350 }}
        error={this.state.error}
        success={this.state.success}
        onSubmit={this.onSubmit}
      >
        <Form.Group widths='equal'>
          <Form.Input
            icon={'mail'}
            iconPosition={'left'}
            placeholder='yours@example.com'
            value={this.state.email}
            onChange={(e, { value }) => {
              this.onChangeValue('email', value);
            }}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            icon={'lock'}
            iconPosition={'left'}
            type='password'
            value={this.state.password}
            placeholder='*******'
            onChange={(e, { value }) => {
              this.onChangeValue('password', value);
            }}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            icon={'lock'}
            iconPosition={'left'}
            type='password'
            value={this.state.confirm}
            placeholder='*******'
            onChange={(e, { value }) => {
              this.onChangeValue('confirm', value);
            }}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.TextArea rows={2} placeholder='Address' value={this.state.address} onChange={(e, {value}) => {
            this.onChangeValue('address', value);
          }} />
        </Form.Group>
        <Form.Select
          options={options}
          placeholder='-- Roles --'
          value={this.state.role}
        />
        {/*
        <Form.Checkbox label='I agree to the Terms and Conditions' error />
        */}
        {this.renderError()}
        <Button
          loading={this.state.loading}
          primary
        >
          Add
        </Button>
      </Form>
    );
  }

}