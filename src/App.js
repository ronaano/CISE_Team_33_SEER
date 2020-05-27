import React from 'react';
// import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CreateArticle from './components/create-article-component.js';
import ModDisplay from './components/display-mod-articles-list-component.js';

function App() {
  return (
    <Router>
    <div className="container">
    <Route path="/create" component={CreateArticle}/>
    <Route path="/moddisplay" component={ModDisplay}/>
    </div>
    </Router>
  );
}

export default App;
