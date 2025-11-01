import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewBankInfo.css';


const ViewBankInfo = () => {

    const [bankInfo, setBankInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); // New state for saving
    const {token} = AuthAction.getState('solar');

    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

   
    
    useEffect(() => {
        const fetchBankInfo = async () => {
            try {
                const res = await axios.get(`/api/user/bank-info/fetch`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if(res.data.status === 422){
                    alert(res.data.message);    
                }

                setBankInfo(res.data.data);
                setDraftValues(res.data.data);
            } catch (error) {
                console.error('Error fetching bank info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBankInfo();
    }, []);



    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        setIsSaving(true); // Start saving
        try {
            const res = await axios.post('/api/user/update/bank-info', draftValues, {
                headers: { Authorization: `Bearer ${token}` }
            });
                   
            if(res.data.status === 200){
                alert('Bank info updated successfully');
                setBankInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update bank info', err);
            alert('Update failed');
        } finally {
            setIsSaving(false); // Stop saving regardless of outcome
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div className="bi-form-group">
            <label className="bi-form-label">{label}</label>
            {editingField === field ? (
                <input
                    type={type}
                    className="bi-text-input"
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <div className="bi-field-display">
                    <span>{draftValues[field] || 'N/A'}</span>
                    <button 
                        className="bi-edit-button" 
                        onClick={() => setEditingField(field)}
                        aria-label={`Edit ${label}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="bi-bank-info-container">
                <div className="bi-loading-container">
                    <div className="bi-loading-spinner"></div>
                    <p>Loading bank information...</p>
                </div>
            </div>
        );
    }

    if (!bankInfo) {
        return (
            <div className="bi-bank-info-container">
                <div className="bi-error-container">
                    <div className="bi-error-icon">⚠️</div>
                    <p>No bank information found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bi-bank-info-container">
            <div className="bi-form-header">
                <h2>Bank Information</h2>
                <p>Manage your bank details for seamless transactions</p>
            </div>

            {/* Rest of your bank info UI */}
            
            <div className="bi-form-section">
                <div className="bi-form-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                    Account Details
                </div>
                
                {renderEditableField('Account Holder Name', 'account_holder_name')}
                {renderEditableField('Account Number', 'account_number')}
                {renderEditableField('Bank Name', 'bank_name')}
                {renderEditableField('IFSC Code', 'ifsc_code')}
                {renderEditableField('Branch Name', 'branch_name')}
                
                <div className="bi-info-card">
                    <p><strong>Security Note:</strong> Your bank information is encrypted and stored securely. We only use this information for processing transactions.</p>
                </div>
                
                <button 
                    className={`bi-submit-button ${isSaving ? 'bi-submit-button-saving' : ''}`} 
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <span className="bi-button-spinner"></span>
                            Saving Changes...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ViewBankInfo;