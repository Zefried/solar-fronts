import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useParams } from 'react-router-dom';
import './Style/UserPersonalInfo.css';

const UserPersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');
    const { id } = useParams();
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const res = await axios.get(`/api/clients/personal-info/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.status === 403) {
                    alert(res.data.message);
                    setPersonalInfo(null);
                    return;
                }

                setPersonalInfo(res.data.data);
                setDraftValues(res.data.data);
            } catch (error) {
                console.error('Error fetching personal info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonalInfo();
    }, [id, token]);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const payload = { ...draftValues };
            payload.userId = id;

            const res = await axios.post('/api/user/update/personal-info', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 200) {
                alert('Personal info updated successfully');
                setPersonalInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update personal info', err);
            alert('Update failed');
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div className="upi-field-container">
            <label className="upi-field-label">{label}</label>
            <div className="upi-field-value">
                {editingField === field ? (
                    <input
                        type={type}
                        className="upi-field-input"
                        value={draftValues[field] || ''}
                        autoFocus
                        onChange={e => handleFieldChange(field, e.target.value)}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                    />
                ) : (
                    <>
                        <span className="upi-field-text">{draftValues[field] || 'N/A'}</span>
                        <button 
                            className="upi-edit-button" 
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
        <div className="upi-loading">
            <div className="upi-loading-spinner"></div>
            <span>Loading personal information...</span>
        </div>
    );
    
    if (!personalInfo) return (
        <div className="upi-empty">
            No personal information found or you are not authorized.
        </div>
    );

    return (
        <div className="upi-container">
            <h2 className="upi-header">Personal Information</h2>
            
            {renderEditableField('First Name', 'first_name')}
            {renderEditableField('Middle Name', 'middle_name')}
            {renderEditableField('Last Name', 'last_name')}
            {renderEditableField('Gender', 'gender')}
            {renderEditableField('Date of Birth', 'dob')}
            {renderEditableField('Address', 'address')}
            {renderEditableField('City', 'city')}
            {renderEditableField('State', 'state')}
            {renderEditableField('Pincode', 'pincode')}
            {renderEditableField('Phone', 'phone')}
            {renderEditableField('Alternative Phone', 'alternative_phone')}

            <button className="upi-save-button" onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default UserPersonalInfo;