import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAuth.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear the specific error when user types in the field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const res = await axios.post('/api/admin-register', {
        type: 'register',
        ...formData
      });

      if (res.data.status === 200) {
        alert('Registration successful');
        AuthAction.updateState({
          isAuthenticated: true,
          name: res.data.data.userData.name,
          token: res.data.data.loginData.access_token
        });
        navigate('/admin');
      } else {
        // Handle validation errors
        if (res.data.errors) {
          setErrors(res.data.errors);
        }
        if (res.data.message) {
          alert(res.data.message);
        }
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status code outside 2xx
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
        alert(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        // Request was made but no response received
        alert('Network error. Please try again.');
      } else {
        // Something else happened
        alert('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Admin Registration</h2>
          <p>Create your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && (
              <small className="error-text">
                {Array.isArray(errors.name) ? errors.name[0] : errors.name}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && (
              <small className="error-text">
                {Array.isArray(errors.phone) ? errors.phone[0] : errors.phone}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <small className="error-text">
                {Array.isArray(errors.password) ? errors.password[0] : errors.password}
              </small>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;