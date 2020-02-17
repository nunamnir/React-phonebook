import React, { Component } from 'react';
import { PhoneBookApp } from './components/Phonebook';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
// import './App.css';

class App extends Component {
  render() {
    return (
      <main id="App">
        <Header />
        <PhoneBookApp />
        <Footer />
      </main>
    );
  }
}

export default App;
