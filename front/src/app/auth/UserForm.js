import React, { Component } from 'react';
import { Form, Button, Message, Segment, Image } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const serviceLoginUrl = '/auth/login';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
    }
  }

  componentDidMount() {
  }

  onLogin = () => {
    this.setState({
      loading: true,
    });
  }

  onSubmit = () => {
    const { email, password } = this.state;


    fetch(serviceLoginUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
      .then((data) => data.json())
      .then(({ user }) => {
        console.log(user);
      })
  }

  onChangeValue = (name, value) => {
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <Segment>

        <Image
          src={require('../img/admin.jpeg')}
        />
        <Form
          style={{ marginTop: 50 }}
          onSubmit={this.onSubmit}
        >
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              placeholder='yours@example.com'
              value={this.state.email}
              onChange={(e, { value }) => {
                this.onChangeValue('email', value);
              }}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              type='password'
              value={this.state.password}
              placeholder='*******'
              onChange={(e, { value }) => {
                this.onChangeValue('password', value);
              }}
            />
          </Form.Group>
          {/*
        <Form.Select options={options} placeholder='Gender' error />
        <Form.Checkbox label='I agree to the Terms and Conditions' error />
        */}
          <Message
            success
            header='Form Completed'
            content="You're all signed up for the newsletter"
          />
          <Button
            loading={this.state.loading}
            primary
            onClick={this.onLogin}
            fluid
          >
            Sign In
          </Button>
        </Form>
      </Segment>
    );
  }

}