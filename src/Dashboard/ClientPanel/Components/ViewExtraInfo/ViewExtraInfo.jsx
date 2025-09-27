import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const ViewExtraInfo = () => {
    const [extraInfo, setExtraInfo] = useState(null);
    const [loading, setLoading] = useState(true);
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
    if (!extraInfo) return <p>No extra information found.</p>;

    return (
        <>
            <h2>Extra Information</h2>
            {renderEditableField('Installation Address Same', 'installation_address')}
            {renderEditableField('Village', 'village')}
            {renderEditableField('Landmark', 'landmark')}
            {renderEditableField('District', 'district')}
            {renderEditableField('Pincode', 'pincode')}
            {renderEditableField('State', 'state')}
            {renderEditableField('Proposed Capacity', 'proposed_capacity')}
            {renderEditableField('Plot Type', 'plot_type')}

            <button style={{ marginTop: '15px', padding: '6px 12px', cursor: 'pointer' }} onClick={handleSaveChanges}>
                Save Changes
            </button>
        </>
    );
};

export default ViewExtraInfo;
