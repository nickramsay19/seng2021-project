import './App.css';
import React from 'react';
import Main from './components/Main/main'
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Main />
      </CookiesProvider>
    </div>
  );
}

export default App;
