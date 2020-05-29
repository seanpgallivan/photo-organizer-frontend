import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
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
  redirect: '/',
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
  }
}

class App extends Component {
  state = INITIAL_STATE


  // Lifecycle Functions:
  componentDidMount() {
    this.login()
  }


  // User Management:
  login = user => {
    let localUser = localStorage.getItem('username')
    if (localUser || user) this.setState({user: {username: (user ? user : localUser)}}, this.loadUser)
  }

  logout = () => {
    this.setState(INITIAL_STATE)
    localStorage.removeItem('username')
  }
  
  signup = user =>
    this.postUser(user)
      .then(this.buildState)
  
  loadUser = (redirect='/photos') => 
    this.getUser(this.state.user.username)
      .then(data => this.buildState(data, redirect))
  

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
  postPhoto = photo =>
    fetch("http://localhost:4000/photos", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(photo)
    }).then(r => r.json())
  patchPhoto = photo =>
    fetch(`http://localhost:4000/photos/${photo.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(photo)
    }).then(r => r.json())
  deletePhoto = id => 
    fetch(`http://localhost:4000/photos/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).then(r => r.json())
  postAlbumsPhoto = (aid, pid) =>
    fetch("http://localhost:4000/albums_photos", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({album_id: aid, photo_id: pid})
    }).then(r => r.json())
  deleteAlbumsPhoto = (aid, pid) =>
    fetch(`http://localhost:4000/albums_photos/${aid},${pid}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).then(r => r.json())
  

  // Builder Function
  buildState = (data, redirect='/photos') => {
    if (data) {
      let unassigned = [{key: '< unassigned >', value: '< unassigned >', text: '< unassigned >'}],
          albumsOptions = unassigned.concat(data.albums.map(opt => ({key: opt.name, value: opt.name, text: opt.name})).sort((a,b)=>a.key.toLowerCase()>b.key.toLowerCase()?1:-1)),
          tagsOptions = unassigned.concat(data.tags.map(opt => ({key: opt, value: opt, text: opt}))),
          peopleOptions = unassigned.concat(data.people.map(opt => ({key: opt, value: opt, text: opt}))),
          locationsOptions = data.locations.map(opt => ({key: opt, value: opt, text: opt}))
      this.setState({
        user: {
          id: data.id,
          username: data.username,
          fullname: data.fullname,
          bio: data.bio
        },
        redirect: redirect,
        photos: data.photos,
        albums: data.albums,
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
    if (filters.tag) photos = photos.filter(photo => 
      filters.tag === '< unassigned >' ? photo.tags.length < 1 : photo.tags.includes(filters.tag))
    if (filters.person) photos = photos.filter(photo => 
      filters.person === '< unassigned >' ? photo.people.length < 1 : photo.people.includes(filters.person))
    if (filters.album) photos = photos.filter(photo => 
      filters.album === '< unassigned >' ? photo.albums.length < 1 : photo.albums.map(al => al.name).includes(filters.album))
    return photos
  }

  albumSelected = () => 
    this.state.albums.find(album => album.name === this.state.filters.album)


  // Callbacks:
  filterChange = filter => {
    let newFilter = !filter ? {album: null, tag: null, person: null, location: null} : {...this.state.filters, ...filter}
    this.setState({filters: newFilter})
  }
  
  completeIndexForm = (target, action, type) => {
    console.log(target, action)
    if (action === 'delete album')
      this.setState(prev => ({filters: {...prev.filters, album: null}}), () =>
        this.deleteAlbum(target.id)
          .then(() => this.loadUser()))
    if (action === "edit album") 
      this.setState(prev => ({filters: {...prev.filters, album: target.name}}), () =>
        this.patchAlbum(target)
          .then(() => this.loadUser()))
    if (action === "new album") 
      this.postAlbum({...target, user_id: this.state.user.id})
        .then(() => this.loadUser())
    
  }


  clickDetail = (photo, act, type, val) => {
    if (act === 'filter') 
      this.setState({
        filters: {
          album: null, tag: null, person: null, location: null,
          [type]: val
        },
        redirect: '/photos'})
    if (act === 'delete') 
      this.setState({redirect: '/photos'}, 
        () => this.deletePhoto(photo.id)
          .then(() => this.loadUser(null)))
    if (act === 'remove' && type === 'albums')
      this.deleteAlbumsPhoto(photo.albums.find(al => al.name === val).id, photo.id)
        .then(() => this.loadUser(null))
    if (act === 'remove' && type !== 'albums')
      this.patchPhoto({id: photo.id, [type]: photo[type].filter(el => el !== val)})
        .then(() => this.loadUser(null))
    if (act === 'add' && type === 'albums')
      this.postAlbumsPhoto(this.state.albums.find(al => al.name === val).id, photo.id)
        .then(() => this.loadUser(null))
    if (act === 'add' && type !== 'albums')
      this.patchPhoto({id: photo.id, [type]: [...photo[type], val]})
        .then(() => this.loadUser(null))
    if (act === 'edit')
      this.patchPhoto({id: photo.id, [type]: val})
        .then(() => this.loadUser(null))
    }

  redirected = () => 
    this.setState({redirect: null})




  // Render:
  render() {
    let {user, redirect, photos, filters, filterOptions, edit} = this.state
    return (
      <Router>
        {redirect ? <> 
          <Redirect to={redirect} />
          {this.redirected()}
        </> : null}
        <Fragment>
          <Header 
            user={user}
            onLogout={this.logout}
          />
          <Route path="/" exact render={() => 
            <Home
              user={user}
            />
          }/>
          <Route path="/photos" exact render={() => 
            <IndexContainer 
              user={user}
              photos={this.filterSort()} 
              album={this.albumSelected()}
              filters={filters}
              filterOptions={filterOptions}
              onClearForms={this.clearForms}
              onFilterChange={this.filterChange}
              onCompleteIndexForm={this.completeIndexForm}
            />
          }/>
          <Route path="/photo/:id" exact render={() => 
            <ShowContainer 
              user={user}
              photos={photos}
              albumOptions={filterOptions.albums}
              onClickDetail={this.clickDetail}
            />
          }/>
          <Route path="/signup" exact render={() => 
            <Signup 
              onSignup={this.signup}
            />
          }/>
          <Route path="/login" exact render={() => 
            <Login
              onLogin={this.login}
            />
          }/>
        </Fragment>
      </Router>
    );
  }
}

export default App;