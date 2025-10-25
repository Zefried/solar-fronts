import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './clientRegister.css';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import SearchEmployee from '../../EmployeePanel/Components/FetchEmployee/FetchEmployee';

const UserRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const handleEmployeeSelected = (e) => {
      setSelectedEmployee({ id: e.detail.id, name: e.detail.name });
    };
    window.addEventListener('employeeSelected', handleEmployeeSelected);
    return () => window.removeEventListener('employeeSelected', handleEmployeeSelected);
  }, []);

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
      const payload = {
        type: 'register',
        ...formData,
        ...(selectedEmployee && {
          employee_id: selectedEmployee.id,
          employee_name: selectedEmployee.name
        })
      };

      const res = await axios.post('/api/user/register', payload);
      if (res.data?.status === 200) {
        alert(res.data.message || 'Registration successful');
        AuthAction.updateState({
          isAuthenticated: true,
          name: res.data.data?.name,
          token: res.data.token
        });
        navigate('/user');
        return;
      }

      if (res.data?.errors) setErrors(res.data.errors);
      if (res.data?.message) alert(res.data.message);
      
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const serverMessage = err.response?.data?.message;
      if (serverErrors) setErrors(serverErrors);
      alert(serverMessage || (err.request ? 'Network error. Please try again.' : 'Unexpected error.'));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">U</div>
            <span>UserPortal</span>
          </div>
          <h2>Create Account</h2>
          <p>Join us today and get started</p>
        </div>

        <div className="employee-section">
          <SearchEmployee />
          <p className="employee-helper-text">
            If this user is being registered by an employee, please search and select the employee responsible.
          </p>
          
          {selectedEmployee && (
            <div className="selected-employee">
              <div className="selected-employee-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p className="selected-label">Associated Employee</p>
                <p className="selected-name">{selectedEmployee.name}</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-container">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? 'input-error' : ''}
              />
            </div>
            {errors.name && (
              <small className="error-text">
                {Array.isArray(errors.name) ? errors.name[0] : errors.name}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-container">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                className={errors.phone ? 'input-error' : ''}
              />
            </div>
            {errors.phone && (
              <small className="error-text">
                {Array.isArray(errors.phone) ? errors.phone[0] : errors.phone}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? 'input-error' : ''}
              />
            </div>
            {errors.password && (
              <small className="error-text">
                {Array.isArray(errors.password) ? errors.password[0] : errors.password}
              </small>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="button-loader"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;