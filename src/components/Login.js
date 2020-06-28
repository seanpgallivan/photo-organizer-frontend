import React, {useState} from 'react';
import {Form, Button, Grid, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Login = ({app: {api, cb}}) => {
  let [field, setField] = useState('')
  let [errors, setErrors] = useState(null)



  // Event Handlers:
  const handleChange = e => 
    setField(e.target.value)

  const handleClick = () => 
    api.data.getUser(field)
      .then(data => cb.buildState(data, '/photos'))
      .catch(err => setErrors(err))

  const showErrors = errors => 
    errors && errors.map((er,i) => <div key={i}>{er}</div>)
  

  return (
    <div className="home">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' inverted textAlign='center'>
            Please login
          </Header>
          <Form size='large'>
            <Form.Input 
              error={!!errors?.username}
              fluid 
              icon='user circle' 
              iconPosition='left' 
              placeholder='Username' 
              value={field}
              onChange={handleChange}
            />
            <div className='error-user'>{showErrors(errors?.username)}</div>
            <Button 
              disabled={!field}
              color='teal' 
              fluid 
              size='large'
              onClick={handleClick}
            >
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
}

export default Login