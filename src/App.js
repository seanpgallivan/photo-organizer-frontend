import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'

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


  render() {
    return (
      App
    );
  }
}

export default App;