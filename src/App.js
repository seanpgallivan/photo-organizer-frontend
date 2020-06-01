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
import {api} from './services/api'

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
  },
  error: null
}

class App extends Component {
  state = INITIAL_STATE



  // Lifecycle Functions:
  componentDidMount() {
    let localUser = localStorage.getItem('username')
    if (localUser) this.loadUser('/photos', localUser)
  }



  // User Management:
  loadUser = (redirect=null, username=this.state.user.username) => 
    api.data.getUser(username)
      .then(data => this.buildState(data, redirect))
      .catch(err => this.setState({error: err.message}))
  logout = () => {
    this.setState(INITIAL_STATE)
    localStorage.removeItem('username')
  }
  signup = user =>
    api.data.postUser(user)
      .then(data => this.buildState(data, '/photos'))
      .catch(err => this.setState({error: err}))




  // Builder Function
  buildState = (data, redirect) => {
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
      photos: data.photos.sort((a,b)=>a.id>b.id?1:-1),
      albums: data.albums,
      filterOptions: {
        albums: albumsOptions,
        tags: tagsOptions,
        people: peopleOptions,
        locations: locationsOptions
      }
    })
    localStorage.setItem('username', data.username)
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
        api.data.deleteAlbum(target.id)
          .then(() => this.loadUser()))
    if (action === "edit album") 
      this.setState(prev => ({filters: {...prev.filters, album: target.name}}), () =>
        api.data.patchAlbum(target)
          .then(() => this.loadUser()))
    if (action === "new album") 
      api.data.postAlbum({...target, user_id: this.state.user.id})
        .then(() => this.loadUser())
    if (action === "new photo")
      api.data.postPhoto({...target, tags: [], people: [], albums: [], user_id: this.state.user.id})
        .then(data => this.loadUser(`/photo/${data.id}`))
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
        () => api.data.deletePhoto(photo.id)
          .then(() => this.loadUser(null)))
    if (act === 'remove' && type === 'albums')
      api.data.deleteAlbumsPhoto(photo.albums.find(al => al.name === val).id, photo.id)
        .then(() => this.loadUser(null))
    if (act === 'remove' && type !== 'albums')
      api.data.patchPhoto({id: photo.id, [type]: photo[type].filter(el => el !== val)})
        .then(() => this.loadUser(null))
    if (act === 'add' && type === 'albums')
      api.data.postAlbumsPhoto(this.state.albums.find(al => al.name === val).id, photo.id)
        .then(() => this.loadUser(null))
    if (act === 'add' && type !== 'albums')
      api.data.patchPhoto({id: photo.id, [type]: [...photo[type], val]})
        .then(() => this.loadUser(null))
    if (act === 'edit')
      api.data.patchPhoto({id: photo.id, [type]: val})
        .then(() => this.loadUser(null))
    }

  redirected = () => 
    this.setState({redirect: null})


  
  


  // Render:
  render() {
    let {user, redirect, photos, filters, filterOptions, error} = this.state
    const cb = {
      buildState: this.buildState
    }
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
              error={error?.signup}
              onSignup={this.signup}
            />
          }/>
          <Route path="/login" exact render={() => 
            <Login
              cb={cb}
            />
          }/>
        </Fragment>
      </Router>
    );
  }
}

export default App;