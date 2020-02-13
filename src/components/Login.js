import React from 'react';
import { Form, Button, Grid, Header, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Login = () => (
  <div className="home">
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' inverted textAlign='center'>
          Please login
        </Header>
        <Form size='large'>
          <Form.Input fluid icon='user circle' iconPosition='left' placeholder='Username' />
          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Form>
        <Header inverted textAlign='center'>
          New to us? <Link to='/signup'>Sign Up</Link>
        </Header>
      </Grid.Column>
    </Grid>
  </div>
)

export default Login