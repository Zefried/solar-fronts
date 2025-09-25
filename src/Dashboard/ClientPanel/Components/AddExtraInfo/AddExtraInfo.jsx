import axios from 'axios';
import React, { useState } from 'react';
import './AddExtrainfo.css';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const AddExtrainfo = () => {
    
    const { token } = AuthAction.getState('solar');
    const [formData, setFormData] = useState({
        installation_address: false,
        village: '',
        landmark: '',
        district: '',
        pincode: '',
        state: '',
        proposed_capacity: '',
        plot_type: '',
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/extra-info', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res.data);
            alert("✅ Extra info saved successfully!");
        } catch (err) {
            console.error(err);
            alert("⚠️ Failed to save extra info.");
        }
    };

    return (
        <div className="ei-extra-info-container">
            <div className="ei-form-header">
                <h2>Installation Details</h2>
                <p>Please provide additional information about your solar installation</p>
            </div>
            
            <div className="ei-info-card">
                <p><strong>Important:</strong> The installation address is where the solar panels will be set up. This may be different from your personal address.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="ei-extra-info-form">
                <div className="ei-form-section">
                    <h3 className="ei-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Installation Address
                    </h3>
                    
                    <div className="ei-checkbox-wrapper">
                        <input
                            type="checkbox"
                            name="installation_address"
                            checked={formData.installation_address}
                            onChange={handleChange}
                            className="ei-checkbox"
                            id="installation-address-checkbox"
                        />
                        <label htmlFor="installation-address-checkbox" className="ei-checkbox-label">
                            Installation Address Same as Personal Address
                        </label>
                    </div>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">Village</label>
                        <input 
                            name="village" 
                            placeholder="Enter Village Name" 
                            value={formData.village} 
                            onChange={handleChange} 
                            className="ei-text-input"
                        />
                    </div>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">Landmark</label>
                        <input 
                            name="landmark" 
                            placeholder="Enter Nearby Landmark" 
                            value={formData.landmark} 
                            onChange={handleChange} 
                            className="ei-text-input"
                        />
                    </div>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">District</label>
                        <input 
                            name="district" 
                            placeholder="Enter District" 
                            value={formData.district} 
                            onChange={handleChange} 
                            className="ei-text-input"
                        />
                    </div>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">Pincode</label>
                        <input 
                            name="pincode" 
                            placeholder="Enter Pincode" 
                            value={formData.pincode} 
                            onChange={handleChange} 
                            className="ei-text-input"
                        />
                    </div>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">State</label>
                        <input 
                            name="state" 
                            placeholder="Enter State" 
                            value={formData.state} 
                            onChange={handleChange} 
                            className="ei-text-input"
                        />
                    </div>
                </div>
                
                <div className="ei-form-section">
                    <h3 className="ei-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Installation Details
                    </h3>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">Proposed Capacity (kW)</label>
                        <input 
                            name="proposed_capacity" 
                            placeholder="Enter Proposed Capacity in kW" 
                            value={formData.proposed_capacity} 
                            onChange={handleChange} 
                            className="ei-text-input"
                        />
                    </div>
                    
                    <div className="ei-form-group">
                        <label className="ei-form-label">Plot Type</label>
                        <select 
                            name="plot_type" 
                            value={formData.plot_type} 
                            onChange={handleChange}
                            className="ei-select"
                        >
                            <option value="">Select Plot Type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" className="ei-submit-button">Save Installation Details</button>
            </form>
        </div>
    );
};

export default AddExtrainfo;