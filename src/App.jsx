import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import TodoList from './components/Lists';


const App = () => {
  return <Router>
    <Navbar />
    < ToastContainer />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lists" element={<TodoList />} />

    </Routes>
  </Router>
}

export default App