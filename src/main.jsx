import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwindcss/output.css';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';  // Wrap the app in Router here

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>  {/* This Router wraps the entire app */}
    <App />
  </Router>
);
