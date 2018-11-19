import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import axios from 'axios';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';


const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {}
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    let that = this
    axios.get('/is_signed_in',{
    })
    .then(function(response){
      if(response.data.email){
        that.setState({
          currentUser: response.data.email
        })
      } else {
        that.setState({
          currentUser: null
        })
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }

  updateCurrentUser(newUserInfo) {
    this.setState({
      currentUser: newUserInfo
    })
  }

  render() {
    return (
      <div className="app">
        <Header updateCurrentUser={this.updateCurrentUser} />
        <Route path="/" exact component={Body} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Footer />
      </div>
    );
  }
}

export default App;