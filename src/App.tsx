import { Home } from './pages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import React from 'react';
import Post from './pages/Post';


function App() {
  return (
    <div className='App'>
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
