import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import TodoList from './components/Lists';
import HomePage from './components/Home';





const App = () => {
  return <Router>
    <Navbar />
    < ToastContainer />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lists" element={<TodoList />} />
      {/* <Route path="/loggedin" element={() => <LoggedInHomePage/>} /> */}

    </Routes>
  </Router>
}

export default App