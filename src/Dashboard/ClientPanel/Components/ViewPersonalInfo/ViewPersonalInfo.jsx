import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewPersonalInfo.css';

const ViewPersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { token } = AuthAction.getState('solar');

    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const res = await axios.get('/api/user/personal-info/fetch', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.status === 422) alert(res.data.message);

                setPersonalInfo(res.data.data);
                setDraftValues(res.data.data);
            } catch (err) {
                console.error('Error fetching personal info:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonalInfo();
    }, []);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            const res = await axios.post('/api/user/update/personal-info', draftValues, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 200) {
                alert('Personal info updated successfully');
                setPersonalInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update personal info', err);
            alert('Update failed');
        } finally {
            setIsSaving(false);
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div className="pi-form-group">
            <label className="pi-form-label">{label}</label>
            {editingField === field ? (
                <input
                    type={type}
                    className="pi-text-input"
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <div className="pi-field-display">
                    <span>{draftValues[field] || 'N/A'}</span>
                    <button 
                        className="pi-edit-button" 
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

    const renderGenderField = () => (
        <div className="pi-form-group">
            <label className="pi-form-label">Gender</label>
            {editingField === 'gender' ? (
                <div className="pi-radio-group">
                    {['male', 'female', 'other'].map(g => (
                        <label key={g} className="pi-radio-label">
                            <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={draftValues.gender === g}
                                onChange={() => handleFieldChange('gender', g)}
                                className="pi-radio-input"
                            />
                            <span className="pi-radio-text">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                        </label>
                    ))}
                </div>
            ) : (
                <div className="pi-field-display">
                    <span>{draftValues.gender ? draftValues.gender.charAt(0).toUpperCase() + draftValues.gender.slice(1) : 'N/A'}</span>
                    <button 
                        className="pi-edit-button" 
                        onClick={() => setEditingField('gender')}
                        aria-label="Edit Gender"
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
            <div className="pi-personal-info-container">
                <div className="pi-loading-container">
                    <div className="pi-loading-spinner"></div>
                    <p>Loading personal information...</p>
                </div>
            </div>
        );
    }

    if (!personalInfo) {
        return (
            <div className="pi-personal-info-container">
                <div className="pi-error-container">
                    <div className="pi-error-icon">⚠️</div>
                    <p>No personal information found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pi-personal-info-container">
            <div className="pi-form-header">
                <h2>Personal Information</h2>
                <p>Manage your personal details for a seamless experience</p>
            </div>
            
            <div className="pi-form-section">
                <div className="pi-form-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Personal Details
                </div>
                
                {renderEditableField('First Name', 'first_name')}
                {renderEditableField('Middle Name', 'middle_name')}
                {renderEditableField('Last Name', 'last_name')}
                {renderGenderField()}
                {renderEditableField('Date of Birth', 'dob', 'date')}
                {renderEditableField('Address', 'address')}
                {renderEditableField('City', 'city')}
                {renderEditableField('State', 'state')}
                {renderEditableField('Pincode', 'pincode')}
                {renderEditableField('Phone', 'phone')}
                {renderEditableField('Alternative Phone', 'alternative_phone')}
                
                <div className="pi-info-card">
                    <p><strong>Privacy Note:</strong> Your personal information is kept secure and private. We only use this information to process your application and provide our services.</p>
                </div>
                
                <button 
                    className={`pi-submit-button ${isSaving ? 'pi-submit-button-saving' : ''}`} 
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <span className="pi-button-spinner"></span>
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

export default ViewPersonalInfo;