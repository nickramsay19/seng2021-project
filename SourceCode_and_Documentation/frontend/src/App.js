import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Searchbar from './components/Searchbar/Searchbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbar />
    </div>
  );
}

export default App;
