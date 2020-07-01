import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";

import Routes from './routes';

import './App.css';

const App =()=> {
  
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </div>
      </Provider>
    );
}

export default App;
