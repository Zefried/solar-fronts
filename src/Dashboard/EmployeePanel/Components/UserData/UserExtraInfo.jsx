import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useParams } from 'react-router-dom';
import './Style/UserExtraInfo.css';

const UserExtraInfo = () => {
    const [extraInfo, setExtraInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');
    const { id } = useParams();
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        const fetchExtraInfo = async () => {
            try {
                const res = await axios.get(`/api/clients/extra-info/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.status === 403) {
                    alert(res.data.message);
                    setExtraInfo(null);
                    return;
                }

                setExtraInfo(res.data.data);
                setDraftValues(res.data.data);
            } catch (error) {
                console.error('Error fetching extra info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchExtraInfo();
    }, [id, token]);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const payload = { ...draftValues };
            payload.userId = id;

            const res = await axios.post('/api/user/update/extra-info', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 200) {
                alert('Extra info updated successfully');
                setExtraInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update extra info', err);
            alert('Update failed');
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div className="uei-field-container">
            <label className="uei-field-label">{label}</label>
            <div className="uei-field-value">
                {editingField === field ? (
                    <input
                        type={type}
                        className="uei-field-input"
                        value={draftValues[field] || ''}
                        autoFocus
                        onChange={e => handleFieldChange(field, e.target.value)}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                    />
                ) : (
                    <>
                        <span className="uei-field-text">{draftValues[field] || 'N/A'}</span>
                        <button 
                            className="uei-edit-button" 
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
        <div className="uei-loading">
            <div className="uei-loading-spinner"></div>
            <span>Loading extra information...</span>
        </div>
    );
    
    if (!extraInfo) return (
        <div className="uei-empty">
            No extra information found or you are not authorized.
        </div>
    );

    return (
        <div className="uei-container">
            <h2 className="uei-header">Extra Information</h2>
            
            <div className="uei-section">
                <h3 className="uei-section-title">Installation Address</h3>
                {renderEditableField('Installation Address', 'installation_address')}
                {renderEditableField('Village', 'village')}
                {renderEditableField('Landmark', 'landmark')}
                {renderEditableField('District', 'district')}
                {renderEditableField('Pincode', 'pincode')}
                {renderEditableField('State', 'state')}
            </div>
            
            <div className="uei-section">
                <h3 className="uei-section-title">Installation Details</h3>
                {renderEditableField('Proposed Capacity (kW)', 'proposed_capacity')}
                {renderEditableField('Plot Type', 'plot_type')}
                {renderEditableField('Consumer Category', 'consumer_category')}
                {renderEditableField('Building Type', 'building_type')}
                {renderEditableField('Installation Roof', 'installation_roof')}
                {renderEditableField('Installation Floor', 'installation_floor')}
                {renderEditableField('SM RT Distance', 'sm_rt_dist')}
                {renderEditableField('Connection Phase', 'connection_phase')}
            </div>

            <button className="uei-save-button" onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default UserExtraInfo;