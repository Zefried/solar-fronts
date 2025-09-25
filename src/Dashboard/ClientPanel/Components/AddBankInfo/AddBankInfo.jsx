import axios from 'axios';
import React, { useState } from 'react';
import './AddBankInfo.css'; // Make sure to import the CSS file
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const AddBankInfos = () => {
    const { token } = AuthAction.getState('solar'); 
    const [formData, setFormData] = useState({
        account_holder_name: '',
        account_number: '',
        bank_name: '',
        ifsc_code: '',
        branch_name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/bank-info', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            alert("✅ Bank information saved successfully!");
        } catch (err) {
            console.error(err);
            alert("⚠️ Failed to save bank information.");
        }
    };

    return (
        <div className="bi-bank-info-container">
            <div className="bi-form-header">
                <h2>Bank Information</h2>
                <p>Please providessss your bank details for payment processing</p>
            </div>
            
            <div className="bi-info-card">
                <p><strong>Security Note:</strong> Your bank information is encrypted and securely stored. We never share your financial details with third parties.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bi-bank-info-form">
                <div className="bi-form-section">
                    <h3 className="bi-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Bank Account Details
                    </h3>
                    
                    <div className="bi-form-group">
                        <label className="bi-form-label">Account Holder Name</label>
                        <input 
                            name="account_holder_name" 
                            placeholder="Enter Account Holder Name" 
                            value={formData.account_holder_name} 
                            onChange={handleChange} 
                            className="bi-text-input"
                        />
                    </div>
                    
                    <div className="bi-form-group">
                        <label className="bi-form-label">Account Number</label>
                        <input 
                            name="account_number" 
                            placeholder="Enter Account Number" 
                            value={formData.account_number} 
                            onChange={handleChange} 
                            className="bi-text-input"
                        />
                    </div>
                    
                    <div className="bi-form-group">
                        <label className="bi-form-label">Bank Name</label>
                        <input 
                            name="bank_name" 
                            placeholder="Enter Bank Name" 
                            value={formData.bank_name} 
                            onChange={handleChange} 
                            className="bi-text-input"
                        />
                    </div>
                    
                    <div className="bi-form-group">
                        <label className="bi-form-label">Branch Name</label>
                        <input 
                            name="branch_name" 
                            placeholder="Enter Branch Name" 
                            value={formData.branch_name} 
                            onChange={handleChange} 
                            className="bi-text-input"
                        />
                    </div>
                    
                    <div className="bi-form-group">
                        <label className="bi-form-label">IFSC Code</label>
                        <input 
                            name="ifsc_code" 
                            placeholder="Enter IFSC Code" 
                            value={formData.ifsc_code} 
                            onChange={handleChange} 
                            className="bi-text-input"
                        />
                    </div>
                </div>
                
                <button type="submit" className="bi-submit-button">Save Bank Information</button>
            </form>
        </div>
    );
};

export default AddBankInfos;