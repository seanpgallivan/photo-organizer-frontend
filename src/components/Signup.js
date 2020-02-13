import React, { Component } from 'react';
import { Form, Button, Checkbox, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const Signup = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header id="login-header" as='h2' color='teal' textAlign='center'>
        {/* <Image src='Photo organizer.png' />  */}
        Please create your account 
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user circle' iconPosition='left' placeholder='Username' />
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
          </Segment>
        </Form>
        <Message>
          If you already have an account please- <a href='#'>Log In</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
  
  export default Signup