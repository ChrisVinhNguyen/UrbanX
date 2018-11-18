import React from 'react';
import HeaderComponent from './HeaderComponent';
import BodyComponent from './BodyComponent';
import FooterComponent from './FooterComponent';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <BodyComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default App;