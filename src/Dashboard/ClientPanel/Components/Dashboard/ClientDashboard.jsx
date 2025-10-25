import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import axios from 'axios';
import './ClientDashboard.css';

const ClientDashboard = () => {
    const { token } = AuthAction.getState('solar');
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    
    // Transformed data for UI
    const [uiData, setUiData] = useState({
        name: '',
        phone: '',
        hasBankDetails: false,
        bankFinanceType: 'bank',
        hasAadhaar: false,
        hasElectricityBill: false,
        hasConsumerNumber: false,
        hasInstallationDetails: false
    });

    const fetchClientData = async (from = null, to = null) => {
        setLoading(true);
        try {
            const res = await axios.post(
                '/api/user/dashboard/reports',
                { from, to },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setClientData(res.data.data);
            transformDataForUI(res.data.data);
        } catch (error) {
            console.error('Error fetching client dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Transform API data to UI format
    const transformDataForUI = (data) => {
        if (!data) return;
        
        // Extract personal info
        const personalInfo = data.personalInfo?.[0] || {};
        const bankInfo = data.bankInfo?.[0] || {};
        const documents = data.documents?.[0] || {};
        const extraInfo = data.extraInfo?.[0] || {};
        
        // Check if installation details are complete
        const hasInstallationDetails = extraInfo.installation_address && 
                                      extraInfo.village && 
                                      extraInfo.district && 
                                      extraInfo.state && 
                                      extraInfo.proposed_capacity && 
                                      extraInfo.plot_type;
        
        // FIXED: Now checking both account number AND account holder name
        const hasBankDetails = !!(bankInfo.account_number && bankInfo.account_holder_name);
        
        setUiData({
            name: `${personalInfo.first_name || ''} ${personalInfo.middle_name || ''} ${personalInfo.last_name || ''}`.trim(),
            phone: personalInfo.phone || '',
            hasBankDetails: hasBankDetails,
            bankFinanceType: 'bank', 
            hasAadhaar: !!documents.id_proof_number,
            hasElectricityBill: !!documents.electricity_bill,
            hasConsumerNumber: !!documents.consumer_number,
            hasInstallationDetails: hasInstallationDetails
        });
    };

    useEffect(() => {
        fetchClientData();
    }, []);

    const handleApplyFilters = () => {
        if (!toDate) {
            alert('Please select a To date');
            return;
        }
        fetchClientData(null, toDate);
    };

    const handleResetFilters = () => {
        setFromDate('');
        setToDate('');
        fetchClientData();
    };

    // Calculate card statuses
    const getBasicInfoStatus = () => {
        const missing = [];
        if (!uiData.name) missing.push('Name');
        if (!uiData.phone) missing.push('Phone');
        
        return {
            completed: missing.length === 0,
            missing: missing
        };
    };

    const getFinancialInfoStatus = () => {
        const missing = [];
        if (!uiData.hasBankDetails) missing.push('Bank details');
        if (!uiData.bankFinanceType) missing.push('Finance type');
        
        return {
            completed: missing.length === 0,
            missing: missing
        };
    };

    const getDocumentStatus = () => {
        const missing = [];
        if (!uiData.hasAadhaar) missing.push('Aadhaar Card');
        if (!uiData.hasElectricityBill) missing.push('Electricity Bill');
        if (!uiData.hasConsumerNumber) missing.push('Consumer Number');
        
        return {
            completed: missing.length === 0,
            missing: missing
        };
    };

    const getInstallationStatus = () => {
        const missing = [];
        if (!uiData.hasInstallationDetails) missing.push('Installation Details');
        
        return {
            completed: missing.length === 0,
            missing: missing
        };
    };

    const basicInfoStatus = getBasicInfoStatus();
    const financialInfoStatus = getFinancialInfoStatus();
    const documentStatus = getDocumentStatus();
    const installationStatus = getInstallationStatus();
    
    // Check if all cards are completed
    const allCardsCompleted = basicInfoStatus.completed && 
                              financialInfoStatus.completed && 
                              documentStatus.completed && 
                              installationStatus.completed;

    if (loading) return (
        <div className="client-dashboard-container">
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        </div>
    );
    
    if (!clientData) return (
        <div className="client-dashboard-container">
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <p>No client data found. Please try again later.</p>
            </div>
        </div>
    );

    const { personalInfo, bankInfo, extraInfo, documents } = clientData;

    return (
        <div className="client-dashboard-container">
            <div className="welcome-section">
                <h1>Welcome, {uiData.name}!</h1>
                <p>{allCardsCompleted ? "Everything is up to date. We will reach you shortly." : "Please complete your application process"}</p>
            </div>
            
            {/* Date Filter Controls */}
            <div className="date-filter-container">
                <div className="date-filter">
                    <label>
                        To Date: 
                        <input 
                            type="date" 
                            value={toDate} 
                            onChange={e => setToDate(e.target.value)} 
                        />
                    </label>
                    <div className="filter-buttons">
                        <button onClick={handleApplyFilters}>Apply</button>
                        <button onClick={handleResetFilters}>Reset</button>
                    </div>
                </div>
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
                        {personalInfo.map(user => (
                            <React.Fragment key={user.id}>
                                <div className="detail-item">
                                    <span className="detail-label">Name:</span>
                                    <span className="detail-value">{user.first_name} {user.middle_name} {user.last_name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Phone:</span>
                                    <span className="detail-value">{user.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">DOB:</span>
                                    <span className="detail-value">{user.dob}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Address:</span>
                                    <span className="detail-value">{user.address}, {user.city}, {user.state}, {user.pincode}</span>
                                </div>
                            </React.Fragment>
                        ))}
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
                        {bankInfo.map(bank => (
                            <React.Fragment key={bank.id}>
                                <div className="detail-item">
                                    <span className="detail-label">Account Holder:</span>
                                    {/* FIXED: Handle null account holder name */}
                                    <span className="detail-value">{bank.account_holder_name || 'Not provided'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Bank:</span>
                                    <span className="detail-value">{bank.bank_name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">IFSC:</span>
                                    <span className="detail-value">{bank.ifsc_code}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Account No:</span>
                                    <span className="detail-value">{bank.account_number}</span>
                                </div>
                            </React.Fragment>
                        ))}
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
                        {documents.map(doc => (
                            <React.Fragment key={doc.id}>
                                <div className="document-item">
                                    <span className="document-name">ID Proof Number</span>
                                    <span className={`document-status ${doc.id_proof_number ? 'uploaded' : 'pending'}`}>
                                        {doc.id_proof_number ? '✓ Provided' : 'Pending'}
                                    </span>
                                </div>
                                <div className="document-item">
                                    <span className="document-name">PAN Number</span>
                                    <span className={`document-status ${doc.pan_number ? 'uploaded' : 'pending'}`}>
                                        {doc.pan_number ? '✓ Provided' : 'Pending'}
                                    </span>
                                </div>
                                <div className="document-item">
                                    <span className="document-name">Consumer Number</span>
                                    <span className={`document-status ${doc.consumer_number ? 'uploaded' : 'pending'}`}>
                                        {doc.consumer_number ? '✓ Provided' : 'Pending'}
                                    </span>
                                </div>
                                <div className="document-item">
                                    <span className="document-name">Electricity Bill</span>
                                    <span className={`document-status ${doc.electricity_bill ? 'uploaded' : 'pending'}`}>
                                        {doc.electricity_bill ? '✓ Uploaded' : 'Pending'}
                                    </span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                
                {/* Installation Details Card */}
                <div className={`status-card ${installationStatus.completed ? 'completed' : 'pending'}`}>
                    <div className="card-icon">
                        {installationStatus.completed ? (
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
                        <h3>Installation Details</h3>
                        {installationStatus.completed ? (
                            <p className="success-text">✓ Completed</p>
                        ) : (
                            <div className="pending-info">
                                <p className="pending-text">Installation details incomplete</p>
                                <p className="missing-text">Missing: {installationStatus.missing.join(', ')}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="card-details">
                        {extraInfo.map(extra => (
                            <React.Fragment key={extra.id}>
                                <div className="detail-item">
                                    <span className="detail-label">Installation Address:</span>
                                    <span className="detail-value">{extra.installation_address == 1 ? 'Same' : 'New'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Village:</span>
                                    <span className="detail-value">{extra.village}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">District:</span>
                                    <span className="detail-value">{extra.district}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">State:</span>
                                    <span className="detail-value">{extra.state}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Proposed Capacity:</span>
                                    <span className="detail-value">{extra.proposed_capacity}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Plot Type:</span>
                                    <span className="detail-value">{extra.plot_type}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;