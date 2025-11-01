import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useParams } from 'react-router-dom';

const UserDocInfo = () => {
    const [docs, setDocs] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');
    const { id } = useParams();

    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [editingFileField, setEditingFileField] = useState(null);

    const BASE_URL = 'http://127.0.0.1:8000/'; // adjust if needed

    // Fetch user document info
    const fetchDocs = async () => {
        try {
            const res = await axios.get(`/api/clients/doc-info/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 403 || res.data.status === 404) {
                alert(res.data.message);
                setDocs(null);
                return;
            }

            setDocs(res.data.data);
            setDraftValues(res.data.data);
        } catch (err) {
            console.error('Error fetching docs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, [id, token]);

    // Handle text field changes
    const handleFieldChange = (field, value) => {
        setDraftValues(prev => ({ ...prev, [field]: value }));
    };

    // Handle file selection
    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setDraftValues(prev => ({ ...prev, [field]: file }));
        setEditingFileField(null);
    };

    // Save all changes
    const handleSaveChanges = async () => {
        const formData = new FormData();

        // Include userId for employee/admin
        formData.append('userId', id);

        Object.entries(draftValues).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            const res = await axios.post('/api/user/update/documents', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.status === 200) {
                alert('Document info updated successfully');
                await fetchDocs();
            }
        } catch (err) {
            console.error('Failed to update docs', err);
            alert('Update failed');
        }
    };

    // Download file
    const handleDownload = async (filePathFromDB) => {
        try {
            const filename = filePathFromDB.split('/').pop();
            const response = await axios.post(
                '/api/user/download',
                { path: filePathFromDB },
                { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' }
            );

            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(fileURL);
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    // Render editable text fields
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
                    <button
                        style={{ marginLeft: '5px', border: 'none', cursor: 'pointer' }}
                        onClick={() => setEditingField(field)}
                    >
                        🖊
                    </button>
                </>
            )}
        </p>
    );

    // Render image/file fields
    const renderImageField = (label, field) => {
        const filePath = draftValues[field];
        const isFile = filePath instanceof File;
        const isPdf = !isFile && filePath && filePath.toLowerCase().endsWith('.pdf');

        return (
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong>{label}:</strong>
                {filePath ? (
                    isFile ? (
                        <span>{filePath.name}</span>
                    ) : isPdf ? (
                        <span>📄 PDF</span>
                    ) : (
                        <img
                            src={`${BASE_URL}${filePath}`}
                            alt={label}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                    )
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
                {filePath && !isFile && (
                    <div style={{ display: 'flex', gap: '5px', marginLeft: '5px' }}>
                        <button
                            onClick={() => window.open(`${BASE_URL}${filePath}`, '_blank', 'noopener,noreferrer')}
                            style={{ cursor: 'pointer' }}
                        >
                            View
                        </button>
                        <button
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                            onClick={() => handleDownload(filePath)}
                        >
                            ⬇ Download
                        </button>
                    </div>
                )}
            </div>
        );
    };

    if (loading) return <p>Loading...</p>;
    if (!docs) return <p>No document information found, Please upload first or you are not authorized.</p>;

    return (
        <div>
            <h2>User Documents</h2>
            {renderImageField('ID Proof Front', 'id_proof_front')}
            {renderImageField('ID Proof Back', 'id_proof_back')}
            {renderEditableField('ID Proof Number', 'id_proof_number')}
            {renderImageField('PAN Card', 'pan_card')}
            {renderEditableField('PAN Number', 'pan_number')}
            {renderImageField('Cancelled Cheque', 'cancelled_cheque')}
            {renderImageField('Electricity Bill', 'electricity_bill')}
            {renderEditableField('Consumer Number', 'consumer_number')}

            <button
                style={{ marginTop: '15px', padding: '6px 12px', cursor: 'pointer' }}
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
        </div>
    );
};

export default UserDocInfo;
