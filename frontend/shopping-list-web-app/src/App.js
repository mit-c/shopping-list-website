import logo from './logo.svg';
import './App.css';
import { TopNavBar } from './components/TopNavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
function App() {
  return (
    <Router>
      <div className="App">
        <TopNavBar />
      </div>
    </Router>
  );
}

export default App;
