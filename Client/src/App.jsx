import React from 'react'
import {BrowserRouter as Router,
  Routes,
  Route,
  Navigate} from 'react-router-dom';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <Router>
   <Routes>
    <Route path ="/" element={<Root/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
   </Routes>
   </Router>
 )}

export default App