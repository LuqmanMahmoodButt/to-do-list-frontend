import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl} from "../config"

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ baseUrl}/api/auth/register/`, formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

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
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
              <button className="button is-primary is-fullwidth" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;