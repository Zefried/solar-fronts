import React, { useState } from 'react';
import './AddBasicInfo.css';

const AddBasicInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occupation: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const occupations = [
    'Salaried Employee',
    'Self-Employed',
    'Business Owner',
    'Professional',
    'Retired',
    'Student',
    'Homemaker',
    'Other'
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
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91\s\d{5}\s\d{5}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., +91 98765 43210)';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
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
      console.log('Basic Info Data:', formData);
      setSuccessMessage('Basic information saved successfully!');
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };
  
  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      occupation: ''
    });
    setErrors({});
  };
  
  return (
    <div className="add-basic-info-container">
      <div className="form-header">
        <h1>Basic Information</h1>
        <p>Please provide your basic details to proceed with your application</p>
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
      
      <div className="form-card">
        <form onSubmit={handleSubmit} className="basic-info-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
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
              {errors.phone && <span className="error-text">{errors.phone}</span>}
              <span className="field-hint">Format: +91 followed by 10 digits</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="occupation">Occupation *</label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={`form-select ${errors.occupation ? 'error' : ''}`}
              >
                <option value="">Select your occupation</option>
                {occupations.map(occupation => (
                  <option key={occupation} value={occupation}>{occupation}</option>
                ))}
              </select>
              {errors.occupation && <span className="error-text">{errors.occupation}</span>}
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                'Save & Continue'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="info-card">
        <h3>Why we need this information</h3>
        <ul className="info-list">
          <li>Your name helps us personalize your experience</li>
          <li>Phone number is required for important notifications</li>
          <li>Email is used for official communications</li>
          <li>Occupation helps us tailor our services to your needs</li>
        </ul>
      </div>
    </div>
  );
};

export default AddBasicInfo;