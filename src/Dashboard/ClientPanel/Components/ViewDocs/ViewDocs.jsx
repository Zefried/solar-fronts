import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const ViewDocs = () => {
    const [docs, setDocs] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');

    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [editingFileField, setEditingFileField] = useState(null);

    const BASE_URL = 'http://127.0.0.1:8000/';

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await axios.get('/api/user/docs/fetch', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.status === 422) alert(res.data.message);

                setDocs(res.data.data);
                setDraftValues(res.data.data);
            } catch (err) {
                console.error('Error fetching docs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('field', field);

        try {
            const res = await axios.post('/api/user/docs/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setDraftValues({ ...draftValues, [field]: res.data.data[field] });
            setEditingFileField(null);
        } catch (err) {
            console.error('File upload failed:', err);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const res = await axios.post('/api/user/docs/update', draftValues, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status === 200) {
                alert('Document info updated successfully');
                setDocs(draftValues);
            }
        } catch (err) {
            console.error('Failed to update docs', err);
            alert('Update failed');
        }
    };

    const renderEditableField = (label, field) => (
        <p>
            <strong>{label}:</strong>{' '}
            {editingField === field ? (
                <input
                    type="text"
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

    const renderImageField = (label, field) => (
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong>{label}:</strong>
            {draftValues[field] ? (
                <img
                    src={`${BASE_URL}${draftValues[field]}`}
                    alt={label}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
            ) : (
                <span>No file</span>
            )}
            <button onClick={() => setEditingFileField(field)}>🖊</button>
            {editingFileField === field && (
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={e => handleFileChange(e, field)}
                    ref={input => input && input.click()}
                />
            )}
        </div>
    );

    if (loading) return <p>Loading...</p>;
    if (!docs) return <p>No document information found.</p>;

    return (
        <>
            <h2>Documents</h2>
            {renderImageField('ID Proof Front', 'id_proof_front')}
            {renderImageField('ID Proof Back', 'id_proof_back')}
            {renderEditableField('ID Proof Number', 'id_proof_number')}
            {renderImageField('PAN Card', 'pan_card')}
            {renderEditableField('PAN Number', 'pan_number')}
            {renderImageField('Cancelled Cheque', 'cancelled_cheque')}
            {renderImageField('Electricity Bill', 'electricity_bill')}
            {renderEditableField('Consumer Number', 'consumer_number')}

            <button style={{ marginTop: '15px', padding: '6px 12px', cursor: 'pointer' }} onClick={handleSaveChanges}>
                Save Changes
            </button>
        </>
    );
};

export default ViewDocs;
