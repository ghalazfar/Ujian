import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Schedule from './components/Schedule';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={HomePage}/>
        <Route path="/schedule" component={Schedule}/>
      </div>
    );
  }
}

export default App;
