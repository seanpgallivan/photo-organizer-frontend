import React, {useState} from 'react';
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Signup = ({onSignup}) => {
  let [fields, setFields] = useState({
    username: '',
    fullname: '',
    bio: ''
  })
  let {username, fullname, bio} = fields

  const handleChange = e => 
    setFields({...fields, [e.target.name]: e.target.value})

  const handleClick = () =>
    onSignup(fields)

  return (
    <div className="home">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' inverted textAlign='center'>
            Please create your account 
          </Header>
          <Form size='large' autoComplete="off">
            <Form.Input 
              fluid 
              icon='user circle' 
              iconPosition='left' 
              placeholder='Username'
              name="username"
              value={username} 
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='user circle'
              iconPosition='left'
              placeholder='Full Name'
              name="fullname"
              value={fullname}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='file text'
              iconPosition='left'
              placeholder='Bio'
              name="bio"
              value={bio}
              onChange={handleChange}
            />
            <Button 
              disabled={!username || !fullname || !bio}
              color='teal' 
              fluid size='large'
              onClick={handleClick}
            >
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
}
  
export default Signup