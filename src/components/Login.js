import React, { Component } from 'react';
import { Form, Button, Checkbox, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const Login = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header id="login-header" as='h2' color='teal' textAlign='center'>
        {/* <Image src='Photo organizer.png' />  */}
        Please login
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user circle' iconPosition='left' placeholder='Username' />
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
)

export default Login