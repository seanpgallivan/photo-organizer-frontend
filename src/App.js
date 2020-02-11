import React, {Component, Fragment} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Header from './components/Header'
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
    fetch("http://localhost:4000/photos")
      .then(r => r.json())
      .then(data => this.setState({photos: data}))
  }

  filterSort = () => {
    let {user, photos, filters} = this.state
    console.log(photos)
    let filtered = photos
    filtered = filtered.filter(photo => photo.user.id === user)
    console.log("filtered", filtered)
    return filtered
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