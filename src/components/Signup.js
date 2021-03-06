import React, {useState} from 'react';
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Signup = ({app: {api, cb}}) => {
  let [fields, setFields] = useState({
    username: '',
    fullname: '',
    bio: ''
  })
  let [errors, setErrors] = useState(null)
  let {username, fullname, bio} = fields

  
  
  // Event Handlers:
  const handleChange = e => 
    setFields({...fields, [e.target.name]: e.target.value})

  const handleClick = () =>
    api.data.postUser({...fields})
      .then(data => cb.buildState(data, '/photos'))
      .catch(err => setErrors(err))

  const showErrors = errors => 
    errors && errors.map((er,i) => <div key={i}>{er}</div>)
        



  return (
    <div className="home">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' inverted textAlign='center'>
            Please create your account 
          </Header>
          <Form size='large' autoComplete="off">
            <Form.Input 
              error={!!errors?.username}
              fluid 
              icon='user circle' 
              iconPosition='left' 
              placeholder='Username'
              name="username"
              value={username} 
              onChange={handleChange}
            />
            <div className='error-user'>{showErrors(errors?.username)}</div>
            <Form.Input
              fluid
              icon='user circle'
              iconPosition='left'
              placeholder='Full Name'
              name="fullname"
              value={fullname}
              onChange={handleChange}
            />
            <div className='error-user'>{showErrors(errors?.fullname)}</div>
            <Form.Input
              fluid
              icon='file text'
              iconPosition='left'
              placeholder='Bio'
              name="bio"
              value={bio}
              onChange={handleChange}
            />
            <div className='error-user'>{showErrors(errors?.bio)}</div>
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