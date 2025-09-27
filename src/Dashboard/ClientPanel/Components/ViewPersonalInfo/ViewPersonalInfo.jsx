import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const ViewPersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(true);
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

    const renderGenderField = () => (
        <p>
            <strong>Gender:</strong>{' '}
            {editingField === 'gender' ? (
                <>
                    {['male', 'female', 'other'].map(g => (
                        <label key={g} style={{ marginRight: '10px' }}>
                            <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={draftValues.gender === g}
                                onChange={() => handleFieldChange('gender', g)}
                            />{' '}
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                        </label>
                    ))}
                </>
            ) : (
                <>
                    {draftValues.gender || 'N/A'}
                    <button style={{ marginLeft: '5px', border: 'none' }} onClick={() => setEditingField('gender')}>🖊</button>
                </>
            )}
        </p>
    );

    if (loading) return <p>Loading...</p>;
    if (!personalInfo) return <p>No personal information found.</p>;

    return (
        <>
            <h2>Personal Information</h2>
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

            <button style={{ marginTop: '15px', padding: '6px 12px', cursor: 'pointer' }} onClick={handleSaveChanges}>
                Save Changes
            </button>
        </>
    );
};

export default ViewPersonalInfo;
