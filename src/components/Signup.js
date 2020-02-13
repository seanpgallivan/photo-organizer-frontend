import React from 'react';
import { Form, Button, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Signup = () => (
  <div className="home">
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' inverted textAlign='center'>
          Please create your account 
        </Header>
        <Form size='large'>
          <Form.Input 
            fluid 
            icon='user circle' 
            iconPosition='left' 
            placeholder='Username' 
          />
          <Form.Input
            fluid
            icon='file text'
            iconPosition='left'
            placeholder='Bio'
          />
          <Form.Input
            fluid
            icon='user circle'
            iconPosition='left'
            placeholder='Full Name'
          />
          <Button color='teal' fluid size='large'>
            Sign up 
          </Button>
        </Form>
        <Header inverted textAlign='center'>
          If you already have an account, please <Link to='/login'>Log In</Link>
        </Header>
      </Grid.Column>
    </Grid>
    </div>
  )
  
  export default Signup