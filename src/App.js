import './App.css';
import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './Component/LoginForm/LoginForm';
import FlightSearch from './Component/FlightSearch/FlightSearch';
import FlightList from './Component/FlightList/FlightList';
import Header from './Component/Header/Header';
const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? <Element {...rest}/> : <Navigate to="/login" />;
};
function App() {  
  const isValidUser=localStorage.getItem('JWT_KEY');
  const [isAuthenticated, setIsAuthenticated] = useState(isValidUser?true:false);
  const handleAuthentication = () => {
    // Once sign-in is successful, update the state to true
    setIsAuthenticated(true);
  };
  return (
    <BrowserRouter>
      {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated}/>}
      <Routes>
        <Route path="/login" element={isValidUser?<Navigate to="/search-flight" />:<LoginForm handleAuthentication={handleAuthentication}/>}></Route>
        <Route
          path="/search-flight"
          element={<ProtectedRoute element={FlightSearch} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/flight/list"
          element={<ProtectedRoute element={FlightList} isAuthenticated={isAuthenticated} />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
