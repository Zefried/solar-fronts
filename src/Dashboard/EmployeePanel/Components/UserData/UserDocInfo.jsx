import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useParams } from 'react-router-dom';
import './Style/UserDocInfo.css';

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
        <div className="udi-field-container">
            <label className="udi-field-label">{label}</label>
            <div className="udi-field-content">
                {editingField === field ? (
                    <input
                        type="text"
                        className="udi-field-input"
                        value={draftValues[field] || ''}
                        autoFocus
                        onChange={e => handleFieldChange(field, e.target.value)}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                    />
                ) : (
                    <>
                        <span className="udi-field-value">{draftValues[field] || 'N/A'}</span>
                        <button 
                            className="udi-edit-button" 
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

    // Render image/file fields
    const renderImageField = (label, field) => {
        const filePath = draftValues[field];
        const isFile = filePath instanceof File;
        const isPdf = !isFile && filePath && filePath.toLowerCase().endsWith('.pdf');

        return (
            <div className="udi-field-container">
                <label className="udi-field-label">{label}</label>
                <div className="udi-field-content">
                    <div className="udi-file-preview">
                        {filePath ? (
                            isFile ? (
                                <div className="udi-file-icon">📄</div>
                            ) : isPdf ? (
                                <div className="udi-file-icon">📄</div>
                            ) : (
                                <img
                                    src={`${BASE_URL}${filePath}`}
                                    alt={label}
                                    className="udi-image-preview"
                                />
                            )
                        ) : (
                            <div className="udi-file-icon">📁</div>
                        )}
                        
                        <div className="udi-file-name">
                            {isFile ? filePath.name : filePath ? filePath.split('/').pop() : 'No file'}
                        </div>
                        
                        <div className="udi-file-actions">
                            <button 
                                className="udi-edit-button" 
                                onClick={() => setEditingFileField(field)}
                                aria-label={`Edit ${label}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            
                            {editingFileField === field && (
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={e => handleFileChange(e, field)}
                                    ref={input => input && input.click()}
                                />
                            )}
                            
                            {filePath && !isFile && (
                                <>
                                    <button
                                        className="udi-action-button"
                                        onClick={() => window.open(`${BASE_URL}${filePath}`, '_blank', 'noopener,noreferrer')}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="udi-action-button download"
                                        onClick={() => handleDownload(filePath)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return (
        <div className="udi-loading">
            <div className="udi-loading-spinner"></div>
            <span>Loading document information...</span>
        </div>
    );
    
    if (!docs) return (
        <div className="udi-empty">
            No document information found, Please upload first or you are not authorized.
        </div>
    );

    return (
        <div className="udi-container">
            <h2 className="udi-header">User Documents</h2>
            
            {renderImageField('ID Proof Front', 'id_proof_front')}
            {renderImageField('ID Proof Back', 'id_proof_back')}
            {renderEditableField('ID Proof Number', 'id_proof_number')}
            {renderImageField('PAN Card', 'pan_card')}
            {renderEditableField('PAN Number', 'pan_number')}
            {renderImageField('Cancelled Cheque', 'cancelled_cheque')}
            {renderImageField('Electricity Bill', 'electricity_bill')}
            {renderEditableField('Consumer Number', 'consumer_number')}

            <button className="udi-save-button" onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default UserDocInfo;