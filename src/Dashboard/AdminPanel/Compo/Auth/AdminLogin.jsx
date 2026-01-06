import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAuth.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

// This component can be used for all types of user login
const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        type: 'login',
        ...formData
      });

      if (res.data?.status === 200) {
        const userName = res.data.data?.name;
        const token = res.data.token;
        const role = res.data.data?.role; 

        AuthAction.updateState({
          isAuthenticated: true,
          name: userName,
          token: token,
          role: role  
        });

        navigate(role === 'admin' ? '/admin' : role === 'employee' ? '/employee' : role === 'user' ? '/user' : '/login');

        // navigate('/admin');
      } else {
        alert(res.data?.message || 'Login failed');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Let's Login</h2>
          <p>Welcome back! Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
