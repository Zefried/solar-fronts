import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useParams } from 'react-router-dom';

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
        <p>
            <strong>{label}:</strong>{' '}
            {editingField === field ? (
                <input
                    type={type}
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <>
                    {draftValues[field] || 'N/A'}
                    <button style={{ marginLeft: '5px', border: 'none' }} onClick={() => setEditingField(field)}>🖊</button>
                </>
            )}
        </p>
    );

    if (loading) return <p>Loading...</p>;
    if (!personalInfo) return <p>No personal information found or you are not authorized.</p>;

    return (
        <>
            <h2>Personal Information</h2>
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

            <button style={{ marginTop: '15px', padding: '6px 12px', cursor: 'pointer' }} onClick={handleSaveChanges}>
                Save Changes
            </button>
        </>
    );
};

export default UserPersonalInfo;
