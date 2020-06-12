import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    return (<nav
        className="navbar navbar-dark bg-dark navbar-expand-lg" >
        <Link to="/" className="navbar-brand">SEER</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">
                        Create an Article</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/mod" className="nav-link">
                        Moderated Articles</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/analyst" className="nav-link">
                        Analyst Articles</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/rejected" className="nav-link">
                        Rejected Articles</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/search" className="nav-link">
                        Search Evidence Records</Link>
                </li>
            </ul>
        </div>
    </nav >);
}


