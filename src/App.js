import React from 'react';
// import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CreateArticle from './components/create-article-component.js';

function App() {
  return (
    <Router>
    <div className="container">
    <Route path="/create" component={CreateArticle}/>
    </div>
    </Router>
  );
}

export default App;
