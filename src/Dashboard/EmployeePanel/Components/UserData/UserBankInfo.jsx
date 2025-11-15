import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useParams } from 'react-router-dom';
import './Style/UserBankInfo.css';

const UserBankInfo = () => {
    const [bankInfo, setBankInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');
    const { id } = useParams();
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchBankInfo = async () => {
            try {
                const res = await axios.get(`/api/clients/bank-info/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.status === 403) {
                    alert(res.data.message);
                    setBankInfo(null);
                    return;
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
    }, [id, token]);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const payload = { ...draftValues };
            payload.userId = id; // employee's target user ID

            const res = await axios.post('/api/user/update/bank-info', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 200) {
                alert('Bank info updated successfully');
                setBankInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update bank info', err);
            alert('Update failed');
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div className="ubi-field-container">
            <label className="ubi-field-label">{label}</label>
            <div className="ubi-field-value">
                {editingField === field ? (
                    <input
                        type={type}
                        className="ubi-field-input"
                        value={draftValues[field] || ''}
                        autoFocus
                        onChange={e => handleFieldChange(field, e.target.value)}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                    />
                ) : (
                    <>
                        <span className="ubi-field-text">{draftValues[field] || 'N/A'}</span>
                        <button 
                            className="ubi-edit-button" 
                            onClick={() => setEditingField(field)}
                            aria-label={`Edit ${label}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );

    if (loading) return (
        <div className="ubi-loading">
            <div className="ubi-loading-spinner"></div>
            <span>Loading bank information...</span>
        </div>
    );
    
    if (!bankInfo) return (
        <div className="ubi-empty">
            No bank information found or you are not authorized.
        </div>
    );

    return (
        <div className="ubi-container">
            <h2 className="ubi-header">Bank Information</h2>
            
            {renderEditableField('Account Holder Name', 'account_holder_name')}
            {renderEditableField('Account Number', 'account_number')}
            {renderEditableField('Bank Name', 'bank_name')}
            {renderEditableField('IFSC Code', 'ifsc_code')}
            {renderEditableField('Branch Name', 'branch_name')}

            <button className="ubi-save-button" onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default UserBankInfo;