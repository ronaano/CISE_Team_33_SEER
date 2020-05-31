import React from 'react';
// import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CreateArticle from './components/create-article-component.js';
import SearchEvidenceRecords from './components/search-evidence-records-component.js';

function App() {
  return (
    <Router>
    <div className="container">
    <Route path="/create" component={CreateArticle}/>
    <Route path="/search" component={SearchEvidenceRecords}/>
     </div>
    </Router>
  );
}

export default App;
