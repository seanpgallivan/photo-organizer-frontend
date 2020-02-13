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
    user: {
      id: 1
    },
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
    edit: {}
  }


  // Lifecycle Functions:
  componentDidMount() {
    this.buildState()
  }


  // Fetches:
  getPhotos = () =>
    fetch("http://localhost:4000/photos")
      .then(r => r.json())
  getAlbums = () =>
    fetch("http://localhost:4000/albums")
      .then(r => r.json())
  postAlbum = album => 
    fetch("http://localhost:4000/albums", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(album)
    }).then(r => r.json())
  patchAlbum = album => 
    fetch(`http://localhost:4000/albums/${album.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(album)
    }).then(r => r.json())
  deleteAlbum = id => 
    fetch(`http://localhost:4000/albums/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).then(r => r.json())
  

  // Builder Functions:
  buildState = () => {
    this.buildPhotoState()
    this.buildAlbumState()
  }

  buildPhotoState = () => this.getPhotos().then(data => {
    let photos = data.filter(photo => photo.user_id === this.state.user.id)
    this.setState({photos: photos})
    let tagsOptions = [], 
        peopleOptions = []
    photos.forEach(photo => {
      photo.tags.forEach(tag => tagsOptions.includes(tag) ? null : tagsOptions.push(tag))
      photo.people.forEach(person => peopleOptions.includes(person) ? null : peopleOptions.push(person))
    })
    tagsOptions = [{key: 0, value: 0, text: "...none..."}].concat(tagsOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
    peopleOptions = [{key: 0, value: 0, text: "...none..."}].concat(peopleOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))  
    this.setState(prev => ({
      filterOptions: {
        ...prev.filterOptions,
        tags: tagsOptions,
        people: peopleOptions
      }
    }))
  })

  buildAlbumState = () => this.getAlbums().then(data => {
    let albums = data.filter(album => album.user_id === this.state.user.id)
    let albumsOptions = [{key: 0, value: 0, text: "...none..."}].concat(albums.map(opt => ({key: opt.name, value: opt.name, text: opt.name})))
    this.setState(prev => ({
      albums: albums, 
      filterOptions: {
        ...prev.filterOptions, 
        albums: albumsOptions
      }
    }))
  })


  // Helper Functions
  filterSort = () => {
    let {photos, filters} = this.state
    if (filters.tag) photos = photos.filter(photo => photo.tags.includes(filters.tag))
    if (filters.person) photos = photos.filter(photo => photo.people.includes(filters.person))
    if (filters.album) photos = photos.filter(photo => photo.albums.map(album => album.name).includes(filters.album.name))
    return photos
  }


  // Callbacks:
  filterChange = filter => {
    if (!filter) {
      this.filterClear()
    } else {
      if (filter.album) filter = {album: this.state.albums.find(album => album.name === filter.album)}
      this.setState(prev => ({
        filters: {...prev.filters, ...filter}
  }))}}

  filterClear = () => this.setState({
    filters: {
      album: null,
      tag: null,
      person: null
    }
  })

  albumDetailsClick = (album, action) => {
    if (action === "delete") {
      this.filterClear()
      this.deleteAlbum(album.id)
        .then(() => this.buildState())
    }
    if (action === "new") this.setState({edit: {album: {}}})
    if (action === "edit") this.setState({edit: {album: album}})
  }

  albumFormClick = (album, action) => {
    this.setState({edit: {}})
    this.filterClear()
    if (action === "confirm" && album.id) {
      this.patchAlbum({...album, user_id: this.state.user})
        .then(() => this.buildState())
    } else if (action === "confirm") {
      this.postAlbum({...album, user_id: this.state.user.id})
        .then(() => this.buildAlbumState())
    }
  }


  // Render:
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