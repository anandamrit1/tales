import { Home } from './pages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import React from 'react';
import Post from './pages/Article';
import { ThemeProvider } from 'degen';
import AuthorPage from 'pages/Author';
import AuthorDashboard from 'pages/AuthorDashboard';
import MyArticles from 'pages/MyArticles';
import Editor from 'pages/Editor';
import Subscribers from 'pages/Subscribers';
import Auth from 'components/Auth';


function App() {
  return (
    <div>
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <Auth>
                <ThemeProvider>
                  <MyArticles />    
                </ThemeProvider>
              </Auth>
            } 
          />
          <Route 
            path="/subscribers" 
            element={
              <Auth>
                <ThemeProvider>
                  <Subscribers />    
                </ThemeProvider>
              </Auth>
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
            path="/:authorId/:articleId"
            element={
              <ThemeProvider>
                <Post />
              </ThemeProvider>
            }
          />
          <Route
            path="/write"
            element={
            <Auth>
              <Editor />
            </Auth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
