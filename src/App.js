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
    albums: null,
    tags: null,
    people: null,
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
    let localUser = localStorage.getItem('username')
    if (localUser) this.loadUser('/photos', localUser)
  }



  // User Management:
  logout = () => {
    this.setState(INITIAL_STATE)
    localStorage.removeItem('username')
  }



  // Builder Function
  loadUser = (redirect=null, username=this.state.user.username) => 
    api.data.getUser(username)
      .then(data => this.buildState(data, redirect))
      .catch(err => this.setState({error: err.message}))

  buildState = (data, redirect) => {
    this.setState({
      user: {
        id: data.id,
        username: data.username,
        fullname: data.fullname,
        bio: data.bio
      },
      redirect: redirect
    })
    this.buildFilterOptions(data.photos, data.albums)
    localStorage.setItem('username', data.username)
  }

  buildFilterOptions = (photos, albums=this.state.albums) => {
    photos = photos || this.state.photos
    let {filters} = this.state,
        newFilters = {},
        albumsOpts,
        tagsOpts = new Set(['< unassigned >']),
        peopleOpts = new Set(['< unassigned >']),
        locationsOpts = new Set()
    photos.forEach(el => {
      el.tags.forEach(opt => tagsOpts.add(opt))
      el.people.forEach(opt => peopleOpts.add(opt))
      locationsOpts.add(el.location)
    })
    if (!tagsOpts.has(filters.tags)) newFilters.tags = null
    if (!peopleOpts.has(filters.people)) newFilters.people = null
    if (!tagsOpts.has(filters.tags)) newFilters.tags = null
    tagsOpts = [...tagsOpts]
      .sort((a,b) => a.toLowerCase()>b.toLowerCase()?1:-1)
      .map(opt => ({key: opt, value: opt, text: opt}))
    peopleOpts = [...peopleOpts]
      .sort((a,b) => a.toLowerCase()>b.toLowerCase()?1:-1)
      .map(opt => ({key: opt, value: opt, text: opt}))
    locationsOpts = [...locationsOpts]
      .sort((a,b) => a.toLowerCase()>b.toLowerCase()?1:-1)
      .map(opt => ({key: opt, value: opt, text: opt}))
    albumsOpts = [...albums, {name: '< unassigned >'}]
      .sort((a,b) => a.name.toLowerCase()>b.name.toLowerCase()?1:-1)
      .map(opt => ({key: opt.name, value: opt.name, text: opt.name}))
    this.setState({
      photos: photos.sort((a,b)=>a.id>b.id?1:-1),
      albums: albums.sort((a,b)=>a.id>b.id?1:-1),
      filterOptions: {
        albums: albumsOpts,
        tags: tagsOpts,
        people: peopleOpts,
        locations: locationsOpts
      },
      filters: {
        ...filters,
        ...newFilters
      }
    })
  }

  
  // Helper Functions:
  redirected = () => 
    this.setState({redirect: null})



  // Callbacks:
  filterChange = filter => {
    let newFilter = !filter ? {albums: null, tags: null, people: null, location: null} : {...this.state.filters, ...filter}
    this.setState({filters: newFilter})
  }

  onSetState = obj =>
    this.setState(obj)



  render() {
    const app = {
      api,
      cb: {
        logout: this.logout,
        loadUser: this.loadUser,
        buildState: this.buildState,
        buildFilterOptions: this.buildFilterOptions,
        filterChange: this.filterChange,
        onSetState: this.onSetState},
      state: {...this.state}
    }
    return (
      <Router>
        {this.state.redirect ? <> 
          <Redirect to={this.state.redirect} />
          {this.redirected()}
        </> : null}
        <Fragment>
          <Header app={app} />
          <Route path="/" exact render={() => 
            <Home app={app} />
          }/>
          <Route path="/photos" exact render={() => 
            <IndexContainer app={app} />
          }/>
          <Route path="/photo/:id" exact render={() => 
            <ShowContainer app={app} />
          }/>
          <Route path="/signup" exact render={() => 
            <Signup app={app} />
          }/>
          <Route path="/login" exact render={() => 
            <Login app={app} />
          }/>
        </Fragment>
      </Router>
    );
  }
}

export default App;