import React, {Component, Fragment} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import IndexContainer from './containers/IndexContainer'
import ShowContainer from './containers/ShowContainer'

class App extends Component {
  state = {
    user: 1,
    photos: [],
    selected: null,
    filters: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/photos")
      .then(r => r.json())
      .then(data => this.setState({photos: data}))
  }

  filterSort = () => {
    let {user, photos, filters} = this.state
    let filtered = photos
    filtered = filtered.filter(photo => photo.user_id === user)
  }

  render() {
    let {selected} = this.state
    return (
      <Fragment>
        <Header />
        {selected ? (
          <ShowContainer 
            photo={selected}
          /> 
        ) : (
          <IndexContainer 
            photos={this.filterSort()}
          />
        )}
      </Fragment>
    );
  }
}

export default App;