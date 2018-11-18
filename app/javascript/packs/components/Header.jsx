import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      userState: "signup"
    };

    this.changeUserState = this.changeUserState.bind(this);
  }

  changeUserState(state) {
    this.setState({
      userState: state
    })
  }

  render() {
    switch(this.state.userState) {
      case "signup":
        return <Signup changeUserState={ this.changeUserState } updateCurrentUser={ this.props.updateCurrentUser } />
      case "login":
        return <Login changeUserState={ this.changeUserState } updateCurrentUser={ this.props.updateCurrentUser } />
      case "logout":
        return <Logout changeUserState={ this.changeUserState } updateCurrentUser={ this.props.updateCurrentUser } />
    }
  }
}

export default Header;
