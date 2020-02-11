import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Header from './components/Header'
import IndexContainer from './containers/IndexContainer'
import ShowContainer from './containers/ShowContainer'

class App extends Component {
  state = {
    user: 1,
    photos: [],
    selected: null,
    filterAlbum: null,
    filterTag: null,
    filterPerson: null
  }

  componentDidMount() {
    fetch("http://localhost:4000/photos")
      .then(r => r.json())
      .then(data => this.setState({photos: data}))
  }

  filterSort = () => {
    let {user, photos, filters} = this.state
    let filtered = photos
    filtered = filtered.filter(photo => photo.user.id === user)
    return filtered
  }

  filterChange = (type, value) => {
    this.setState({[type]: value})
  }


  render() {
    let {photos, filterAlbum, filterTag, filterPerson} = this.state
    return (
      <Router>
        <Fragment>
          <Header />
          <Route path="/" exact
            render={() => 
              <IndexContainer 
                photos={this.filterSort()} 
                filterAlbum={filterAlbum}
                filterTag={filterTag}
                filterPerson={filterPerson}
                onFilterChange={this.filterChange}
              />}
          />
          <Route path="/image/:id" 
            render={() => 
              <ShowContainer 
                photos={photos} 
              />}
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;