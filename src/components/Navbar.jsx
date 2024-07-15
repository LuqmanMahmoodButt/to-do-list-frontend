import { Link, redirect, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))

  useEffect(() => {
    // console.log(location.pathname)
    setIsLoggedIn(localStorage.getItem('token'))
  }, [location])

  function logout() {
    setIsLoggedIn(false)
    localStorage.removeItem('token')

    navigate("/")
  }

  return <nav className="navbar">
    <div className="navbar-menu is-active">
      <div className="navbar">
        <div className="navbar-item">
          <div className="buttons">
            {isLoggedIn ? (
              <>
                <Link to="/userhome" className="button">Home</Link>
                <Link to="/lists" className="button">Todo List</Link>
                <button className="button" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/" className="button">Home</Link>
                <Link to="/signup" className="button">Signup</Link>
                <Link to="/login" className="button">Login</Link>
              </>
            )}
         
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar