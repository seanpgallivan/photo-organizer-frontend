import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import IndexContainer from './containers/IndexContainer'
import ShowContainer from './containers/ShowContainer'

class App extends Component {
  state = {
    user: 1,
    photos: [],
    albums: [],
    filters: {
      album: null,
      tag: null,
      person: null
    },
    filterOptions: {
      albums: [],
      tags: [],
      people: []
    },
    edit: {
      album: null,
      photo: null
    }
  }

  componentDidMount() {
    fetch("http://localhost:4000/photos")
      .then(r => r.json())
      .then(data => this.setState(this.buildState(data)))
  }

  buildState = data => {
    let photos = data.filter(photo => photo.user.id === this.state.user),
        albums = [], 
        tagsOptions = [], 
        peopleOptions = [],
        albumsOptions = []
    photos.forEach(photo => {
      photo.albums.forEach(album => {
        if (!albumsOptions.includes(album.name)) {
          albumsOptions.push(album.name)
          albums.push(album)
        }
      })
      photo.tags.forEach(tag => tagsOptions.includes(tag) ? null : tagsOptions.push(tag))
      photo.people.forEach(person => peopleOptions.includes(person) ? null : peopleOptions.push(person))
    })
    albumsOptions = [{key: 0, value: 0, text: "...none..."}].concat(albumsOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
    tagsOptions = [{key: 0, value: 0, text: "...none..."}].concat(tagsOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
    peopleOptions = [{key: 0, value: 0, text: "...none..."}].concat(peopleOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))  
    return {
      photos: photos, 
      albums: albums,
      filterOptions: {
        albums: albumsOptions,
        tags: tagsOptions,
        people: peopleOptions
      }
    }
  }

  filterSort = () => {
    let {photos, filters} = this.state
    if (filters.tag) photos = photos.filter(photo => photo.tags.includes(filters.tag))
    if (filters.person) photos = photos.filter(photo => photo.people.includes(filters.person))
    if (filters.album) photos = photos.filter(photo => photo.albums.map(album => album.name).includes(filters.album.name))
    return photos
  }

  filterChange = filter => {
    if (filter.album) filter = {album: this.state.albums.find(album => album.name === filter.album)}
    console.log(filter)
    this.setState(prev => ({
      filters: {...prev.filters, ...filter}
  }))}


  albumDetailsClick = e => {

  }

  albumFormClick = album => {

  }

  render() {
    let {photos, filters, filterOptions, edit} = this.state
    return (
      <Router>
        <Fragment>
          <Header />
          <Route path="/" exact
            render={() => 
              <Home

              />
            }
          />

          <Route path="/photos" exact
            render={() => 
              <IndexContainer 
                photos={this.filterSort()} 
                filters={filters}
                filterOptions={filterOptions}
                edit={edit}
                onFilterChange={this.filterChange}
                onFilterClear={this.filterClear}
                onAlbumDetailsClick={this.albumDetailsClick}
                onAlbumFormClick={this.albumFormClick}
              />
            }
          />
          <Route path="/photo/:id" exact
            render={props => 
              <ShowContainer 
                {...props}
                photos={photos} 
              />
            }
          />
          <Route path="/signup" exact
            render={() => 
              <Signup 

              />
            }
          />
          <Route path="/login" exact
            render={() => 
              <Login

              />
            }
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;