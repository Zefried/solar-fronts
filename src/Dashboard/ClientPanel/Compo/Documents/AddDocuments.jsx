// Documents.jsx
import React, { useState } from 'react';
import './AddDocuments.css';

const AddDocuments = () => {
  const [formData, setFormData] = useState({
    hasAadhaar: true,
    hasElectricityBill: false,
    hasConsumerNumber: true,
    aadhaarFile: null,
    electricityBillFile: null,
    consumerNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing or selects a file
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.hasAadhaar && !formData.aadhaarFile) {
      newErrors.aadhaarFile = 'Please upload your Aadhaar card';
    }
    
    if (formData.hasElectricityBill && !formData.electricityBillFile) {
      newErrors.electricityBillFile = 'Please upload your electricity bill';
    }
    
    if (formData.hasConsumerNumber && !formData.consumerNumber.trim()) {
      newErrors.consumerNumber = 'Consumer number is required';
    } else if (formData.hasConsumerNumber && formData.consumerNumber.trim().length < 5) {
      newErrors.consumerNumber = 'Consumer number must be at least 5 characters';
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
      console.log('Documents Data:', formData);
      setSuccessMessage('Document information saved successfully!');
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };
  
  const handleReset = () => {
    setFormData({
      hasAadhaar: true,
      hasElectricityBill: false,
      hasConsumerNumber: true,
      aadhaarFile: null,
      electricityBillFile: null,
      consumerNumber: ''
    });
    setErrors({});
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div className="documents-container">
      <div className="form-header">
        <h1>Document Verification</h1>
        <p>Please upload required documents to verify your identity</p>
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
        <form onSubmit={handleSubmit} className="documents-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasAadhaar"
                  checked={formData.hasAadhaar}
                  onChange={handleChange}
                />
                I have Aadhaar card
              </label>
              
              {formData.hasAadhaar && (
                <div className="file-upload">
                  <label htmlFor="aadhaarFile" className="file-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload Aadhaar Card
                  </label>
                  <input
                    type="file"
                    id="aadhaarFile"
                    name="aadhaarFile"
                    onChange={handleChange}
                    accept="image/*,.pdf"
                    className="file-input"
                  />
                  
                  {formData.aadhaarFile && (
                    <div className="file-info">
                      <span className="file-name">{formData.aadhaarFile.name}</span>
                      <span className="file-size">{formatFileSize(formData.aadhaarFile.size)}</span>
                    </div>
                  )}
                  
                  {errors.aadhaarFile && <span className="error-text">{errors.aadhaarFile}</span>}
                  <span className="field-hint">Upload in JPG, PNG or PDF format (Max 5MB)</span>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasElectricityBill"
                  checked={formData.hasElectricityBill}
                  onChange={handleChange}
                />
                I have electricity bill
              </label>
              
              {formData.hasElectricityBill && (
                <div className="file-upload">
                  <label htmlFor="electricityBillFile" className="file-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload Electricity Bill
                  </label>
                  <input
                    type="file"
                    id="electricityBillFile"
                    name="electricityBillFile"
                    onChange={handleChange}
                    accept="image/*,.pdf"
                    className="file-input"
                  />
                  
                  {formData.electricityBillFile && (
                    <div className="file-info">
                      <span className="file-name">{formData.electricityBillFile.name}</span>
                      <span className="file-size">{formatFileSize(formData.electricityBillFile.size)}</span>
                    </div>
                  )}
                  
                  {errors.electricityBillFile && <span className="error-text">{errors.electricityBillFile}</span>}
                  <span className="field-hint">Upload in JPG, PNG or PDF format (Max 5MB)</span>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasConsumerNumber"
                  checked={formData.hasConsumerNumber}
                  onChange={handleChange}
                />
                I have consumer number
              </label>
              
              {formData.hasConsumerNumber && (
                <>
                  <input
                    type="text"
                    id="consumerNumber"
                    name="consumerNumber"
                    value={formData.consumerNumber}
                    onChange={handleChange}
                    placeholder="Enter your consumer number"
                    className={`form-input ${errors.consumerNumber ? 'error' : ''}`}
                  />
                  {errors.consumerNumber && <span className="error-text">{errors.consumerNumber}</span>}
                  <span className="field-hint">Enter the consumer number from your utility bill</span>
                </>
              )}
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
        <h3>Document Requirements</h3>
        <ul className="info-list">
          <li>Aadhaar card is required for identity verification</li>
          <li>Electricity bill serves as address proof</li>
          <li>Consumer number helps verify your utility connection</li>
          <li>All documents should be clear and legible</li>
        </ul>
      </div>
    </div>
  );
};

export default AddDocuments;