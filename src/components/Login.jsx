import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { baseUrl} from "../config"

import { toast } from 'react-toastify'


export default function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })


  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${ baseUrl}/api/auth/login/`, formData)
      const token = data.token

      localStorage.setItem('token', token)
      toast.success('Login successful!');
      navigate('/userhome')
    } catch (err) {
      toast.error(err.response.data.message);
      toast.error('login Failed')
    }
  }

  return (
    <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: '100vh' }}>
      <div className="box" style={{ width: '400px' }}>
        <h1 className="title has-text-centered">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
            <input
              className="input"
              type="text"
              name={'email'}
              onChange={handleChange}
              value={formData.email}
            />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary is-fullwidth" type="submit">Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

