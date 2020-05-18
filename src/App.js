import React from 'react';
import './App.css';
import BackGround from './components/backGround/BackGround'
import Main from './components/MainSection/Main'
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
