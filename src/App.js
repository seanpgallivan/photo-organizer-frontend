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

const INITIAL_STATE = {
  user: null,
  redirect: false,
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

class App extends Component {
  state = INITIAL_STATE


  // Lifecycle Functions:
  componentDidMount() {
    let localUser = localStorage.getItem('username')
    if (localUser) this.login(localUser)
  }


  // User Management:
  login = username => 
    this.getUser(username)
      .then(this.buildState)

  logout = () => {
    this.setState(INITIAL_STATE)
    localStorage.removeItem('username')
  }

  signup = user =>
    this.postUser(user)
      .then(this.buildState)


  // Fetches:
  getUser = username =>
    fetch(`http://localhost:4000/users/${username}`)
      .then(r => r.json())
  postUser = user => 
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(user)
    }).then(r => r.json())
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
  buildState = data => {
    if (data) {
      let photos = data.photos,
          albums = [],
          albumsOptions = [],
          tagsOptions = [], 
          peopleOptions = []
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
      albumsOptions = [{key: 0, value: 0, text: "< none >"}].concat(albumsOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
      tagsOptions = [{key: 0, value: 0, text: "< none >"}].concat(tagsOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
      peopleOptions = [{key: 0, value: 0, text: "< none >"}].concat(peopleOptions.sort().map(opt => ({key: opt, value: opt, text: opt})))
      delete data.photos
      this.setState({
        user: data,
        redirect: true,
        photos: photos,
        albums: albums,
        filters: {
          album: null,
          tag: null,
          person: null
        },
        filterOptions: {
          albums: albumsOptions,
          tags: tagsOptions,
          people: peopleOptions
        },
        edit: {}
      })
      localStorage.setItem('username', data.username)
    }
  }


  // Helper Functions:
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
      this.patchAlbum(album)
        .then(() => this.buildState())
    } else if (action === "confirm") {
      this.postAlbum({...album, user_id: this.state.user.id})
        .then(() => this.buildAlbumState())
    }
  }

  clearForms = () =>
    this.setState({edit: {}})

  redirected = () => 
    this.setState({redirect: false})


  // Render:
  render() {
    let {user, redirect, photos, filters, filterOptions, edit} = this.state
    return (
      <Router>
        <Fragment>
          <Header 
            user={user}
            onLogout={this.logout}
          />
          <Route path="/" exact
            render={() => 
              <Home
                user={user}
                onRedirected={this.redirected}
              />
            }
          />
          <Route path="/photos" exact
            render={() => 
              <IndexContainer 
                user={user}
                photos={this.filterSort()} 
                filters={filters}
                filterOptions={filterOptions}
                edit={edit}
                onClearForms={this.clearForms}
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
                user={user}
                photos={photos} 
              />
            }
          />
          <Route path="/signup" exact
            render={() => 
              <Signup 
                redirect={redirect}
                onSignup={this.signup}
              />
            }
          />
          <Route path="/login" exact
            render={() => 
              <Login
                redirect={redirect}
                onLogin={this.login}
              />
            }
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;