import { Home } from './pages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import React from 'react';
import Post from './pages/Post';
import { ThemeProvider } from 'degen';
import AuthorPage from 'pages/Author';
import AuthorDashboard from 'pages/AuthorDashboard';
import MyArticles from 'pages/MyArticles';
import Editor from 'pages/Editor';


function App() {
  return (
    <div>
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <ThemeProvider>
                <MyArticles />    
              </ThemeProvider>
            } 
          />
          <Route
            path="/:id"
            element={
              <AuthorPage />
            }
          />
          <Route
            path="/"
            element={
              <ThemeProvider>
                <Home />
              </ThemeProvider>
            }
          />
          <Route
            path="/:authorId/:id"
            element={
              <ThemeProvider>
                <Post />
              </ThemeProvider>
            }
          />
          <Route
            path="/write"
            element={
              <Editor />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
