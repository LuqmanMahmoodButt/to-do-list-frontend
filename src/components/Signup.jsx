import { useState } from "react"
import axios from 'axios'

import { useNavigate } from "react-router-dom"
import { baseUrl } from '../config';
import { toast } from 'react-toastify'

export default function Signup() {


  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })


  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

 
  async function handleSubmit(e) {
    e.preventDefault() 
    try {


      navigate('/login')
      toast.success('Sign Up Successful!');
    } catch (err) {

      console.log(err.response.data)
      toast.error('Sign Up Failed')

    }
  }


  return (
    <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: '100vh' }}>
      <div className="box" style={{ width: '400px' }}>
        <h1 className="title has-text-centered">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="email"
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
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                value={formData.password_confirmation}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary is-fullwidth" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}