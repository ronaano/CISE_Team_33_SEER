import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateArticle from './components/create-article-component';
import ModDisplay from './components/display-mod-articles-list-component';
import AnalystDisplay from "./components/display-analyst-articles-component";
import SearchEvidenceRecords from './components/search-evidence-records-component';
import RejectedDisplay from './components/display-rejected-articles-component';
import CreateEvidenceRecord from './components/create-evidence-record-component';
import Navbar from './components/navbar-component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/mod"
          component={ModDisplay} />
        <Route path="/create"
          component={CreateArticle} />
        <Route path="/analyst"
          component={AnalystDisplay} />
        <Route path="/search"
          component={SearchEvidenceRecords} />
        <Route path="/rejected"
          component={RejectedDisplay} />
        <Route path="/createevidencerecord/:_id"
          component={CreateEvidenceRecord} />
      </div>
    </Router>
  );
}

export default App;
