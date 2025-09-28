import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewExtraInfo.css';

const ViewExtraInfo = () => {
    const [extraInfo, setExtraInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { token } = AuthAction.getState('solar');

    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchExtraInfo = async () => {
            try {
                const res = await axios.get('/api/user/extra-info/fetch', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.status === 422) alert(res.data.message);
                setExtraInfo(res.data.data);
                setDraftValues(res.data.data);
            } catch (err) {
                console.error('Error fetching extra info:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchExtraInfo();
    }, []);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            const res = await axios.post('/api/user/update/extra-info', draftValues, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status === 200) {
                alert('Extra info updated successfully');
                setExtraInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update extra info', err);
            alert('Update failed');
        } finally {
            setIsSaving(false);
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div className="ei-form-group">
            <label className="ei-form-label">{label}</label>
            {editingField === field ? (
                <input
                    type={type}
                    className="ei-text-input"
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <div className="ei-field-display">
                    <span>{draftValues[field] || 'N/A'}</span>
                    <button 
                        className="ei-edit-button" 
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
            <div className="ei-extra-info-container">
                <div className="ei-loading-container">
                    <div className="ei-loading-spinner"></div>
                    <p>Loading extra information...</p>
                </div>
            </div>
        );
    }

    if (!extraInfo) {
        return (
            <div className="ei-extra-info-container">
                <div className="ei-error-container">
                    <div className="ei-error-icon">⚠️</div>
                    <p>No extra information found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ei-extra-info-container">
            <div className="ei-form-header">
                <h2>Installation Information</h2>
                <p>Manage your installation details for a seamless process</p>
            </div>
            
            <div className="ei-form-section">
                <div className="ei-form-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Installation Details
                </div>
                
                {renderEditableField('Installation Address', 'installation_address')}
                {renderEditableField('Village', 'village')}
                {renderEditableField('Landmark', 'landmark')}
                {renderEditableField('District', 'district')}
                {renderEditableField('Pincode', 'pincode')}
                {renderEditableField('State', 'state')}
                {renderEditableField('Proposed Capacity', 'proposed_capacity')}
                {renderEditableField('Plot Type', 'plot_type')}
                
                <div className="ei-info-card">
                    <p><strong>Note:</strong> Please ensure all installation details are accurate to avoid delays in processing your application.</p>
                </div>
                
                <button 
                    className={`ei-submit-button ${isSaving ? 'ei-submit-button-saving' : ''}`} 
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <span className="ei-button-spinner"></span>
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

export default ViewExtraInfo;