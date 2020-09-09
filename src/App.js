import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from './components/Home';
import Upload from './components/Upload';
import Error from './components/Error';
function App() {
  return (
    <Router>
    <Switch>
      <Route exact path='/' >
        <Home />
      </Route>
      <Route  path='/upload' >
        <Upload />
      </Route>
      <Route  path='*' >
        <Error />
      </Route>
    </Switch> 
    </Router>
  );
}

export default App;
