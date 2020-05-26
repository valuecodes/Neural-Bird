import React from 'react';
import './App.css';
import BackGround from './components/background/background'
import Main from './components/MainSection/Main'
import NavBar from './components/NavBar/NavBar'
import { GlobalProvider } from './context/GlobalState'
import { GlobalOptionsProvider } from './context/GlobalOptions'
import {GlobalGenerationalProvider} from './context/GlobalGenerational'
import { GlobalInOutProvider } from './context/GlobalInOut';

function App() {
  return (
    <GlobalProvider>
      <GlobalOptionsProvider>
        <GlobalGenerationalProvider>
          <GlobalInOutProvider>
          <div className="App">
              <NavBar/>
              <BackGround/>
              <Main/>
          </div>
          </GlobalInOutProvider>
        </GlobalGenerationalProvider>
      </GlobalOptionsProvider>
    </GlobalProvider>
  );
}

export default App;
