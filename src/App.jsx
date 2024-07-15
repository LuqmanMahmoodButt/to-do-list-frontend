import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import TodoList from './components/Lists';
import HomePage from './components/Home';
import UserHome from './components/UserHome';




const App = () => {
  return <Router>
    <Navbar />
    < ToastContainer />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lists" element={<TodoList />} />
      <Route path="/userhome" element={<UserHome />} />
    </Routes>
  </Router>
}

export default App