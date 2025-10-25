import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Compo/Auth/AdminAuth.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const EmployeeRegister = () => {
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
    setErrors({});

    try {
      const res = await axios.post('/api/employee/register', {
        type: 'register',
        ...formData
      });

      if (res.data?.status === 200) {
        console.log(res.data);
        alert(res.data.message || 'Registration successful');
        AuthAction.updateState({
          isAuthenticated: true,
          name: res.data.data?.name,
          token: res.data.token,
          role:res.data.data.role,
        });
        navigate('/employee');
        return;
      }

      if (res.data?.errors) setErrors(res.data.errors);
      if (res.data?.message) alert(res.data.message);

    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const serverMessage = err.response?.data?.message;

      if (serverErrors) setErrors(serverErrors);
      alert(serverMessage || (err.request ? 'Network error. Please try again.' : 'An unexpected error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Employee Registration</h2>
          <p>Create your employee account</p>
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

export default EmployeeRegister;
