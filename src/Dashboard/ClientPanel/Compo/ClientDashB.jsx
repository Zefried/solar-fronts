import React, { useState } from 'react';
import './ClientDashB.css';

const ClientDashB = () => {
  // Client data
  const [clientData, setClientData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    occupation: 'Business Owner',
    
    // Financial info
    hasBankDetails: true,
    bankFinanceType: 'bank', // 'self' or 'bank'
    
    // Documents
    hasAadhaar: true,
    hasElectricityBill: false,
    hasConsumerNumber: true
  });

  // Calculate card statuses
  const getBasicInfoStatus = () => {
    const missing = [];
    if (!clientData.name) missing.push('Name');
    if (!clientData.phone) missing.push('Phone');
    if (!clientData.email) missing.push('Email');
    if (!clientData.occupation) missing.push('Occupation');
    
    return {
      completed: missing.length === 0,
      missing: missing
    };
  };

  const getFinancialInfoStatus = () => {
    const missing = [];
    if (!clientData.hasBankDetails) missing.push('Bank details');
    if (!clientData.bankFinanceType) missing.push('Finance type');
    
    return {
      completed: missing.length === 0,
      missing: missing
    };
  };

  const getDocumentStatus = () => {
    const missing = [];
    if (!clientData.hasAadhaar) missing.push('Aadhaar Card');
    if (!clientData.hasElectricityBill) missing.push('Electricity Bill');
    if (!clientData.hasConsumerNumber) missing.push('Consumer Number');
    
    return {
      completed: missing.length === 0,
      missing: missing
    };
  };

  const basicInfoStatus = getBasicInfoStatus();
  const financialInfoStatus = getFinancialInfoStatus();
  const documentStatus = getDocumentStatus();

  // Toggle functions for demo purposes
  const toggleField = (field) => {
    setClientData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const toggleFinanceType = () => {
    setClientData(prev => ({
      ...prev,
      bankFinanceType: prev.bankFinanceType === 'bank' ? 'self' : 'bank'
    }));
  };

  return (
    <div className="client-dashboard-container">
      <div className="welcome-section">
        <h1>Welcome, {clientData.name}!</h1>
        <p>Please complete your application process</p>
      </div>
      
      <div className="status-cards">
        {/* Basic Info Card */}
        <div className={`status-card ${basicInfoStatus.completed ? 'completed' : 'pending'}`}>
          <div className="card-icon">
            {basicInfoStatus.completed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
          </div>
          
          <div className="card-content">
            <h3>Basic Information</h3>
            {basicInfoStatus.completed ? (
              <p className="success-text">✓ Completed</p>
            ) : (
              <div className="pending-info">
                <p className="pending-text">Document upload incomplete</p>
                <p className="missing-text">Missing: {basicInfoStatus.missing.join(', ')}</p>
              </div>
            )}
          </div>
          
          <div className="card-details">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{clientData.name || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{clientData.phone || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{clientData.email || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Occupation:</span>
              <span className="detail-value">{clientData.occupation || '-'}</span>
            </div>
          </div>
        </div>
        
        {/* Financial Info Card */}
        <div className={`status-card ${financialInfoStatus.completed ? 'completed' : 'pending'}`}>
          <div className="card-icon">
            {financialInfoStatus.completed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
          </div>
          
          <div className="card-content">
            <h3>Financial Information</h3>
            {financialInfoStatus.completed ? (
              <p className="success-text">✓ Completed</p>
            ) : (
              <div className="pending-info">
                <p className="pending-text">Document upload incomplete</p>
                <p className="missing-text">Missing: {financialInfoStatus.missing.join(', ')}</p>
              </div>
            )}
          </div>
          
          <div className="card-details">
            <div className="detail-item">
              <span className="detail-label">Bank Details:</span>
              <span className="detail-value">{clientData.hasBankDetails ? 'Provided' : 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Finance Type:</span>
              <span className="detail-value">
                {clientData.bankFinanceType === 'bank' ? 'Bank Finance' : 'Self Finance'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Document Upload Card */}
        <div className={`status-card ${documentStatus.completed ? 'completed' : 'pending'}`}>
          <div className="card-icon">
            {documentStatus.completed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
          </div>
          
            <div className="card-content">
                <h3>Document Upload</h3>
                {documentStatus.completed ? (
                    <>
                    <p className="success-text">✓ Document upload completed</p>
                    <p className="verification-text">Please wait for verification</p>
                    </>
                ) : (
                    <div className="pending-info">
                    <p className="pending-text">Document upload incomplete</p>
                    <p className="missing-text">Missing: {documentStatus.missing.join(', ')}</p>
                    </div>
                )}
            </div>
          
          <div className="card-details">
            <div className="document-item">
              <span className="document-name">Aadhaar Card</span>
              <span className={`document-status ${clientData.hasAadhaar ? 'uploaded' : 'pending'}`}>
                {clientData.hasAadhaar ? '✓ Uploaded' : 'Pending'}
              </span>
            </div>
            <div className="document-item">
              <span className="document-name">Electricity Bill</span>
              <span className={`document-status ${clientData.hasElectricityBill ? 'uploaded' : 'pending'}`}>
                {clientData.hasElectricityBill ? '✓ Uploaded' : 'Pending'}
              </span>
            </div>
            <div className="document-item">
              <span className="document-name">Consumer Number</span>
              <span className={`document-status ${clientData.hasConsumerNumber ? 'uploaded' : 'pending'}`}>
                {clientData.hasConsumerNumber ? '✓ Uploaded' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="demo-controls">
        <p className="demo-title">Demo Controls (for testing):</p>
        <div className="demo-buttons">
          <button onClick={() => toggleField('name')}>Toggle Name</button>
          <button onClick={() => toggleField('phone')}>Toggle Phone</button>
          <button onClick={() => toggleField('hasBankDetails')}>Toggle Bank Details</button>
          <button onClick={() => toggleField('hasAadhaar')}>Toggle Aadhaar</button>
          <button onClick={() => toggleField('hasElectricityBill')}>Toggle Electricity Bill</button>
          <button onClick={() => toggleField('hasConsumerNumber')}>Toggle Consumer No.</button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashB;