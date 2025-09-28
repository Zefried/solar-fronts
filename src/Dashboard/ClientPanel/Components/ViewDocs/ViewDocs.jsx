import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import './ViewDocs.css';

const ViewDocs = () => {
    // State for document data
    const [docs, setDocs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); // Added for save button loading state
    const { token } = AuthAction.getState('solar');

    // State for editable values
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [editingFileField, setEditingFileField] = useState(null);

    const BASE_URL = 'http://127.0.0.1:8000/';

    // Fetch documents from backend
    const fetchDocs = async () => {
        try {
            const res = await axios.get('/api/user/docs/fetch', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status === 422) alert(res.data.message);

            // Store in state for display and editing
            setDocs(res.data.data);
            setDraftValues(res.data.data);
        } catch (err) {
            console.error('Error fetching docs:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on component mount
    useEffect(() => {
        fetchDocs();
    }, []);

    // Handle text field changes
    const handleFieldChange = (field, value) => {
        setDraftValues(prev => ({ ...prev, [field]: value }));
    };

    // Handle file selection
    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        // Update draftValues with the new file
        setDraftValues(prev => ({ ...prev, [field]: file }));
        setEditingFileField(null);
    };

    // Save all changes to backend
    const handleSaveChanges = async () => {
        setIsSaving(true); // Start loading
        const formData = new FormData();
        // Append all fields to FormData
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
                await fetchDocs(); // Refresh after update
            }
        } catch (err) {
            console.error('Failed to update docs', err);
            alert('Update failed');
        } finally {
            setIsSaving(false); // Stop loading
        }
    };

    const handleDownload = async (filePathFromDB) => {
        try {
            const filename = filePathFromDB.split('/').pop(); // extract just the name for saving
            const response = await axios.post(
                '/api/user/download',
                { path: filePathFromDB }, // send full path
                { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' }
            );

            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', filename); // force download with proper name
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
        <div className="di-form-group">
            <label className="di-form-label">{label}</label>
            {editingField === field ? (
                <input
                    type="text"
                    className="di-text-input"
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <div className="di-field-display">
                    <span>{draftValues[field] || 'N/A'}</span>
                    <button
                        className="di-edit-button"
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

    // Render image/file fields
    const renderImageField = (label, field) => {
        const filePath = draftValues[field];
        const isFile = filePath instanceof File;
        const isPdf = !isFile && filePath && filePath.toLowerCase().endsWith('.pdf');

        return (
            <div className="di-form-group">
                <label className="di-form-label">{label}</label>
                <div className="di-file-field-container">
                    {filePath ? (
                        isFile ? (
                            <div className="di-file-preview">
                                <span className="di-file-name">{filePath.name}</span>
                            </div>
                        ) : isPdf ? (
                            <div className="di-file-preview di-pdf-preview">
                                <span className="di-file-icon">📄</span>
                                <span className="di-file-name">PDF Document</span>
                            </div>
                        ) : (
                            <div className="di-image-preview">
                                <img
                                    src={`${BASE_URL}${filePath}`}
                                    alt={label}
                                    className="di-preview-image"
                                />
                            </div>
                        )
                    ) : (
                        <div className="di-no-file">No file uploaded</div>
                    )}
                    
                    <div className="di-file-actions">
                        <button 
                            className="di-edit-button"
                            onClick={() => setEditingFileField(field)}
                            aria-label={`Upload ${label}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                        </button>
                        
                        {editingFileField === field && (
                            <input
                                type="file"
                                className="di-file-input"
                                onChange={e => handleFileChange(e, field)}
                                ref={input => input && input.click()}
                            />
                        )}
                        
                        {filePath && !isFile && (
                            <div className="di-view-download-buttons">
                                <button
                                    className="di-view-button"
                                    onClick={() => window.open(`${BASE_URL}${filePath}`, '_blank', 'noopener,noreferrer')}
                                >
                                    View
                                </button>
                                <button
                                    className="di-download-button"
                                    onClick={() => handleDownload(filePath)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="di-docs-container">
                <div className="di-loading-container">
                    <div className="di-loading-spinner"></div>
                    <p>Loading documents...</p>
                </div>
            </div>
        );
    }

    if (!docs) {
        return (
            <div className="di-docs-container">
                <div className="di-error-container">
                    <div className="di-error-icon">⚠️</div>
                    <p>No document information found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="di-docs-container">
            <div className="di-form-header">
                <h2>Document Information</h2>
                <p>Manage your documents for a seamless application process</p>
            </div>
            
            <div className="di-form-section">
                <div className="di-form-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Required Documents
                </div>
                
                {renderImageField('ID Proof Front', 'id_proof_front')}
                {renderImageField('ID Proof Back', 'id_proof_back')}
                {renderEditableField('ID Proof Number', 'id_proof_number')}
                {renderImageField('PAN Card', 'pan_card')}
                {renderEditableField('PAN Number', 'pan_number')}
                {renderImageField('Cancelled Cheque', 'cancelled_cheque')}
                {renderImageField('Electricity Bill', 'electricity_bill')}
                {renderEditableField('Consumer Number', 'consumer_number')}
                
                <div className="di-info-card">
                    <p><strong>Security Note:</strong> All documents are encrypted and stored securely. We only use these documents for verification and processing your application.</p>
                </div>
                
                <button 
                    className={`di-submit-button ${isSaving ? 'di-submit-button-saving' : ''}`} 
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <span className="di-button-spinner"></span>
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

export default ViewDocs;