import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    joinDate: '',
    status: 'Active'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const positions = [
    'Solar Installer',
    'Solar Agent',
    'Solar Technician',
    'Solar Consultant',
    'Solar Project Manager'
  ];
  
  const departments = [
    'Installation',
    'Sales',
    'Maintenance',
    'Project Management',
    'Customer Service'
  ];
  
  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Inactive', label: 'Inactive' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+91\s\d{5}\s\d{5}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be in format: +91 98765 43210';
    }
    
    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Employee data:', formData);
      setSuccessMessage('Employee added successfully!');
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        joinDate: '',
        status: 'Active'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="add-employee-container">
      <div className="add-employee-header">
        <h1>Add Employee</h1>
        <p>Fill in the details to add a new employee to the system</p>
      </div>
      
      {successMessage && (
        <div className="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {successMessage}
        </div>
      )}
      
      <div className="add-employee-form-container">
        <form onSubmit={handleSubmit} className="add-employee-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`form-select ${errors.position ? 'error' : ''}`}
              >
                <option value="">Select position</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
              {errors.position && <span className="error-message">{errors.position}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`form-select ${errors.department ? 'error' : ''}`}
              >
                <option value="">Select department</option>
                {departments.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`form-input ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="joinDate">Join Date *</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className={`form-input ${errors.joinDate ? 'error' : ''}`}
              />
              {errors.joinDate && <span className="error-message">{errors.joinDate}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <div className="radio-group">
                {statusOptions.map(option => (
                  <label key={option.value} className="radio-label">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={formData.status === option.value}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    <span className="radio-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => {
                setFormData({
                  name: '',
                  position: '',
                  department: '',
                  email: '',
                  phone: '',
                  joinDate: '',
                  status: 'Active'
                });
                setErrors({});
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                'Add Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;