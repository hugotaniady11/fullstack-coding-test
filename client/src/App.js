import { Login, Register, Home } from './pages';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import '../src/App.css'
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('user') || false
  );

  const setAuth = (value) => {
    setIsAuthenticated(value);
    //alert(value);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);


  return (
    <>
      <head>
        <title>Fetch Post</title>
      </head>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated
                ? <Home />
                : <Navigate to="/login" replace />
              }
            />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
