// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element = { < Layout />} >
      <Route index element={< IndexPage />} />
      <Route path="/login" element = {< LoginPage /> } />
      <Route path="/register" element = {<RegisterPage />} />
      </Route>
    </Routes>
    
  );
}

export default App;
