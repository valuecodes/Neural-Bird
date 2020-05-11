import React from 'react';
import './App.css';
import NavBar from './components/Navigation/NavBar'
import Main from './components/MainSection/Main'
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <GlobalProvider>
      <div className="App">
          <NavBar/>
          <Main/>
      </div>
    </GlobalProvider>
  );
}

export default App;
