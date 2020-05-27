import React from 'react';
import './App.css';
import BackGround from './components/backGround/BackGround'
import Main from './components/MainSection/Main'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/background/Footer'
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
              <Footer/>
          </div>
          </GlobalInOutProvider>
        </GlobalGenerationalProvider>
      </GlobalOptionsProvider>
    </GlobalProvider>
  );
}

export default App;
