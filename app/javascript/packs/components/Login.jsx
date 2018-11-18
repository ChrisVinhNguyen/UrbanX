import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    let that = this
    axios.post('/users', {
      user: {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        password_confirmation: document.getElementById("password_confirmation").value
      }
    })
    .then(function(response){
      that.props.changeUserState("delete");
      that.props.updateCurrentUser(email);
    })
    .catch(function(error){
      console.log(error)
    })
  }

render() {
  return (
      <div>
        <h2>Login</h2>
        <form>
          <input id="email" placeholder="email"/>
          <input id="password" placeholder="password"/>
          <input id="password_confirmation" placeholder="retype password"/>
          <button onClick={this.handleLogin}>Submit</button>
        </form>
      </div>
    );
  };
};

export default Login;
