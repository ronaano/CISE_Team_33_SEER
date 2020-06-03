import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateArticle from './components/create-article-component.js';
import ModDisplay from './components/display-mod-articles-list-component.js';
import AnalystDisplay from "./components/display-analyst-articles-component.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/mod" component={ModDisplay} />
        <Route path="/create" component={CreateArticle} />
        <Route path="/analyst" component={AnalystDisplay} />
      </div>
    </Router>
  );
}

export default App;
