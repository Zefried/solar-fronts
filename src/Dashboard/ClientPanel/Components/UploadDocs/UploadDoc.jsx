import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './UploadDoc.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import FetchUser from '../../../EmployeePanel/Components/FetchUsers/FetchUser';

const UploadDocs = () => {
    const { token } = AuthAction.getState('solar');
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        idProofFront: null,
        idProofBack: null,
        idProofNumber: '',
        panCard: null,
        panNumber: '',
        cancelledCheque: null,
        electricityBill: null,
        consumerNumber: '',
        userId:'',
    });

    useEffect(() => {
        const handleUserSelected = (e) => {
            setSelectedUser({ id: e.detail.id, name: e.detail.name });
            console.log("User selected event received:", e.detail);
        };
        window.addEventListener('userSelected', handleUserSelected);
        return () => window.removeEventListener('userSelected', handleUserSelected);
       
    }, []);

    console.log("Selected User:", selectedUser);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = new FormData();
        // Append all fields, including null checks
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                payload.append(key, value);
            }
        });

        const {role} = AuthAction.getState('solar');
        if (role !== 'user' && selectedUser) payload.append('userId', selectedUser.id);

        try {
            const res = await axios.post(
                '/api/user/doc/upload',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log("Upload success:", res.data);

            if (res.data.status === 200) {
                alert("✅ Documents uploaded successfully!");
            } else {
                alert(res.data.message || "⚠️ Something went wrong");
            }
            
            if(res.data.status == 404){
                alert(res.data.message);
            }

        } catch (err) {
            console.error("Upload failed:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ud-document-upload-container">
            <div className="ud-form-header">
                <h2>Document Verification</h2>
                <p>Please upload the required documents to complete your verification process</p>
            </div>

            <FetchUser/>

            {
                selectedUser && (<div className="ud-selected-user-info">
                   Selected User: <strong>{selectedUser.name} </strong>  Upload documents for this user.
                </div>
                )
            }
            
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="ud-document-upload-form">
                {/* Two-column row for ID Proof and PAN Card */}
                <div className="ud-form-row">
                    <div className="ud-form-column">
                        <div className="ud-form-section">
                            <h3 className="ud-form-section-title">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                                </svg>
                                ID Proof
                            </h3>
                            
                            <div className="ud-form-group">
                                <label className="ud-form-label">ID Proof (Front)</label>
                                <div className="ud-file-input-wrapper">
                                    <input type="file" name="idProofFront" onChange={handleChange} className="ud-file-input" />
                                    <div className="ud-file-input-display">
                                        <svg className="ud-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        {formData.idProofFront ? formData.idProofFront.name : 'Choose file or drag here'}
                                    </div>
                                </div>
                            </div>

                            <div className="ud-form-group">
                                <label className="ud-form-label">ID Proof (Back)</label>
                                <div className="ud-file-input-wrapper">
                                    <input type="file" name="idProofBack" onChange={handleChange} className="ud-file-input" />
                                    <div className="ud-file-input-display">
                                        <svg className="ud-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        {formData.idProofBack ? formData.idProofBack.name : 'Choose file or drag here'}
                                    </div>
                                </div>
                            </div>

                            <div className="ud-form-group">
                                <label className="ud-form-label">ID Number</label>
                                <input 
                                    type="text" 
                                    name="idProofNumber" 
                                    placeholder="Enter ID Number" 
                                    value={formData.idProofNumber} 
                                    onChange={handleChange} 
                                    className="ud-text-input" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="ud-form-column">
                        <div className="ud-form-section">
                            <h3 className="ud-form-section-title">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                PAN Card
                            </h3>
                            
                            <div className="ud-form-group">
                                <label className="ud-form-label">PAN Card</label>
                                <div className="ud-file-input-wrapper">
                                    <input type="file" name="panCard" onChange={handleChange} className="ud-file-input" />
                                    <div className="ud-file-input-display">
                                        <svg className="ud-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        {formData.panCard ? formData.panCard.name : 'Choose file or drag here'}
                                    </div>
                                </div>
                            </div>

                            <div className="ud-form-group">
                                <label className="ud-form-label">PAN Number</label>
                                <input 
                                    type="text" 
                                    name="panNumber" 
                                    placeholder="Enter PAN Number" 
                                    value={formData.panNumber} 
                                    onChange={handleChange} 
                                    className="ud-text-input" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bank Details Section - Full Width */}
                <div className="ud-form-section">
                    <h3 className="ud-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Bank Details
                    </h3>
                    
                    <div className="ud-form-group">
                        <label className="ud-form-label">Cancelled Cheque</label>
                        <div className="ud-file-input-wrapper">
                            <input type="file" name="cancelledCheque" onChange={handleChange} className="ud-file-input" />
                            <div className="ud-file-input-display">
                                <svg className="ud-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                {formData.cancelledCheque ? formData.cancelledCheque.name : 'Choose file or drag here'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Proof Section - Full Width */}
                <div className="ud-form-section">
                    <h3 className="ud-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Address Proof
                    </h3>
                    
                    <div className="ud-form-group">
                        <label className="ud-form-label">Electricity Bill</label>
                        <div className="ud-file-input-wrapper">
                            <input type="file" name="electricityBill" onChange={handleChange} className="ud-file-input" />
                            <div className="ud-file-input-display">
                                <svg className="ud-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                {formData.electricityBill ? formData.electricityBill.name : 'Choose file or drag here'}
                            </div>
                        </div>
                    </div>

                    <div className="ud-form-group">
                        <label className="ud-form-label">Consumer Number</label>
                        <input 
                            type="text" 
                            name="consumerNumber" 
                            placeholder="Enter Consumer Number" 
                            value={formData.consumerNumber} 
                            onChange={handleChange} 
                            className="ud-text-input" 
                        />
                    </div>
                </div>

                
                <button 
                    type="submit" 
                    className={`ud-submit-button ${loading ? 'loading' : ''}`} 
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Submit Documents"}
                </button>
                
            </form>
        </div>
    );
};

export default UploadDocs;