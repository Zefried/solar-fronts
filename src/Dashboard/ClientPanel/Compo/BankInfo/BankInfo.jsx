// FinancialInfo.jsx
import React, { useState } from 'react';
import './bankInfo.css';

const FinancialInfo = () => {
  const [formData, setFormData] = useState({
    hasBankDetails: true,
    bankFinanceType: 'bank', // 'self' or 'bank'
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Other'
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (formData.hasBankDetails && formData.bankFinanceType === 'bank') {
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
      
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
        newErrors.accountNumber = 'Account number must be 9-18 digits';
      }
      
      if (!formData.ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC code is required';
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
        newErrors.ifscCode = 'Please enter a valid IFSC code';
      }
      
      if (!formData.accountHolderName.trim()) {
        newErrors.accountHolderName = 'Account holder name is required';
      }
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
      console.log('Financial Info Data:', formData);
      setSuccessMessage('Financial information saved successfully!');
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };
  
  const handleReset = () => {
    setFormData({
      hasBankDetails: true,
      bankFinanceType: 'bank',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    });
    setErrors({});
  };
  
  return (
    <div className="financial-info-container">
      <div className="form-header">
        <h1>Financial Information</h1>
        <p>Please provide your financial details to proceed with your application</p>
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
        <form onSubmit={handleSubmit} className="financial-info-form">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="hasBankDetails"
                checked={formData.hasBankDetails}
                onChange={handleChange}
              />
              I have bank details to provide
            </label>
          </div>
          
          {formData.hasBankDetails && (
            <>
              <div className="form-group">
                <label>Finance Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="bankFinanceType"
                      value="bank"
                      checked={formData.bankFinanceType === 'bank'}
                      onChange={handleChange}
                    />
                    Bank Financing
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="bankFinanceType"
                      value="self"
                      checked={formData.bankFinanceType === 'self'}
                      onChange={handleChange}
                    />
                    Self Financing
                  </label>
                </div>
              </div>
              
              {formData.bankFinanceType === 'bank' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="bankName">Bank Name *</label>
                    <select
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className={`form-select ${errors.bankName ? 'error' : ''}`}
                    >
                      <option value="">Select your bank</option>
                      {banks.map(bank => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                    {errors.bankName && <span className="error-text">{errors.bankName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="accountNumber">Account Number *</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="Enter your account number"
                      className={`form-input ${errors.accountNumber ? 'error' : ''}`}
                    />
                    {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="ifscCode">IFSC Code *</label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter IFSC code (e.g., HDFC0001234)"
                      className={`form-input ${errors.ifscCode ? 'error' : ''}`}
                    />
                    {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="accountHolderName">Account Holder Name *</label>
                    <input
                      type="text"
                      id="accountHolderName"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      placeholder="Enter account holder name"
                      className={`form-input ${errors.accountHolderName ? 'error' : ''}`}
                    />
                    {errors.accountHolderName && <span className="error-text">{errors.accountHolderName}</span>}
                  </div>
                </div>
              )}
            </>
          )}
          
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
          <li>Bank details are required for loan processing</li>
          <li>Account information helps verify your financial status</li>
          <li>IFSC code ensures accurate fund transfers</li>
          <li>Account holder name must match your identification documents</li>
        </ul>
      </div>
    </div>
  );
};

export default FinancialInfo;