import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'

class Home extends Component {

    componentDidMount() {
        this.props.onRedirected()
    }

    render() {
        return (
            <div className="home">
                <Grid textAlign='center' className="homebox" verticalAlign='middle'>
                    <Grid.Column className="homeimage">
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
  
export default Home