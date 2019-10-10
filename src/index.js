import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Spooky from './components/Spooky'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
      <Spooky />
  </Router>
  , document.getElementById('root'))
