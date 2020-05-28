import React, {Component} from 'react';
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

class Signup extends Component {
  state = {
    username: "",
    fullname: "",
    bio: ""
  }

  handleChange = e => 
    this.setState({[e.target.name]: e.target.value})

  handleClick = () => {
    let {username, fullname, bio} = this.state
    if (username && fullname && bio) 
      this.props.onSignup(this.state)
  }

  render() {
    let {username, fullname, bio} = this.state
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
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='user circle'
                iconPosition='left'
                placeholder='Full Name'
                name="fullname"
                value={fullname}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='file text'
                iconPosition='left'
                placeholder='Bio'
                name="bio"
                value={bio}
                onChange={this.handleChange}
              />
              <Button 
                color='teal' 
                fluid size='large'
                onClick={this.handleClick}
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
}
  
export default Signup