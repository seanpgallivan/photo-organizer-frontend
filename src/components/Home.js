import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Button} from 'semantic-ui-react'

const Home = ({app: {state: {user}}}) => {
    return (
        <div className='home'>
            <div className='fade-in'>
                <Grid className="homebox" verticalAlign='middle'>
                    <Grid.Column className="homecontent">
                        <div className="homeimage"></div>
                        <div className="homespacer"></div>
                        {user ? (
                            <></>
                        ) : (
                            <div className="homebuttonbox">
                                <Button size="huge" color="teal" as={Link} to='/login'>Login</Button>
                                <Button size="huge" color="teal" as={Link} to='/signup'>Signup</Button>
                            </div>
                        )}
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    )
}
  
export default Home