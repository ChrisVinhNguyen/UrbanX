import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import axios from 'axios';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import UserProfile from './UserProfile'


const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserInfo: {}
    };
  }

  componentDidMount() {
    let that = this
    axios.get('/is_signed_in')
    .then(function(response){
      if(response.data.user_info && response.data.user_info.user_profile_id != null) {
        that.setState({
          currentUserInfo: response.data.user_info
        })
      } else {
        that.setState({
          currentUserInfo: null
        })
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    console.log(this.state.currentUserInfo)
    return (
      <div className="app">
        <Header currentUser={ this.state.currentUserInfo } />
        <Route path="/" exact component={ Body } />
        <Route path="/about/" component={ About } />
        <Route path="/users/" component={ Users } />
        <Route path= "/user_profiles/:id"  render={({match})  => <UserProfile currentUserId={this.state.currentUserInfo.user_profile_id} match={match}/>} />
        <Footer />
      </div>
    );
  }
}

export default App;