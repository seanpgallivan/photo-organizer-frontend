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
    person: null,
    location: null
  },
  filterOptions: {
    albums: [],
    tags: [],
    people: [],
    locations: []
  },
  edit: {}
}

class App extends Component {
  state = INITIAL_STATE


  // Lifecycle Functions:
  componentDidMount() {
    this.loadUser()
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

  loadUser = () => {
    let localUser = localStorage.getItem('username')
    if (localUser) this.login(localUser)
  }


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
  deletePhoto = id => 
    fetch(`http://localhost:4000/photos/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).then(r => r.json())
  

  // Builder Function (builds filter options)
  buildState = data => {
    if (data) {
      let noOpt = [{key: "", value: "", text: "< none >"}],
          albumsOptions = noOpt.concat(data.albums.map(opt => ({key: opt.name, value: opt.name, text: opt.name}))).sort((a,b)=>a.key.toLowerCase()>b.key.toLowerCase()?1:-1),
          tagsOptions = noOpt.concat(data.tags.map(opt => ({key: opt, value: opt, text: opt}))),
          peopleOptions = noOpt.concat(data.people.map(opt => ({key: opt, value: opt, text: opt}))),
          locationsOptions = noOpt.concat(data.locations.map(opt => ({key: opt, value: opt, text: opt})))
      this.setState({
        user: {
          id: data.id,
          username: data.username,
          fullname: data.fullname,
          bio: data.bio
        },
        redirect: true,
        photos: data.photos,
        albums: data.albums,
        filters: {
          album: null,
          tag: null,
          person: null,
          location: null
        },
        filterOptions: {
          albums: albumsOptions,
          tags: tagsOptions,
          people: peopleOptions,
          locations: locationsOptions
        },
        edit: {}
      })
      localStorage.setItem('username', data.username)
    }
  }


  // Helper Functions:
  filterSort = () => {
    let {photos, filters} = this.state
    if (filters.location) photos = photos.filter(photo => photo.location===filters.location)
    if (filters.tag) photos = photos.filter(photo => photo.tags.includes(filters.tag))
    if (filters.person) photos = photos.filter(photo => photo.people.includes(filters.person))
    if (filters.album) photos = photos.filter(photo => photo.albums.map(album => album.name).includes(filters.album))
    return photos
  }


  // Callbacks:
  filterChange = filter => {
    let newFilter = !filter ? {album: null, tag: null, person: null, location: null} : {...this.state.filters, ...filter}
    this.setState({filters: newFilter})
  }

  albumDetailsClick = (album, action) => {
    if (action === "delete") 
      this.deleteAlbum(album.id)
      .then(() => this.loadUser())
    if (action === "new")
      this.setState({edit: {album: {}}})
    if (action === "edit")
      this.setState({edit: {album: album}})
  }

  albumFormClick = (album, action) => {
    if (action === "confirm" && album.id) {
      this.patchAlbum(album)
        .then(() => this.loadUser())
    } else if (action === "confirm") {
      this.postAlbum({...album, user_id: this.state.user.id})
        .then(() => this.loadUser())
  }}

  clickFilter = (type, name, history) => {
    this.setState({
      filters: {
        album: type === "alb" ? name : null,
        tag: type === "tag" ? name : null,
        person: type === "per" ? name : null,
        location: type === "loc" ? name : null
    }})
    history.push('/photos')
  }

  deletePhotoClick = (photo, history) => {
    history.push('/photos')
    this.deletePhoto(photo.id)
        .then(() => this.loadUser())
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
                onDeletePhoto={this.deletePhotoClick}
                onClickFilter={this.clickFilter}
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