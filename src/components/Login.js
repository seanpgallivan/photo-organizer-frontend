import React, {Component} from 'react';
import {Form, Button, Grid, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

class Login extends Component {
  state = {
    username: "",
  }

  handleChange = e => 
    this.setState({username: e.target.value})

  handleClick = () => {
    if (this.state.username) 
      this.props.onLogin(this.state.username)
  }

  render() {
    return (
      <div className="home">
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h1' inverted textAlign='center'>
              Please login
            </Header>
            <Form size='large'>
              <Form.Input 
                fluid 
                icon='user circle' 
                iconPosition='left' 
                placeholder='Username' 
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Button 
                color='teal' 
                fluid 
                size='large'
                onClick={this.handleClick}
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
}

export default Login