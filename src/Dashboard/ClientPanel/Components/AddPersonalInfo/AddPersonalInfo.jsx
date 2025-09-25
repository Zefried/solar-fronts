import axios from 'axios';
import React, { useState } from 'react';
import './AddPersonalInfo.css'; // Make sure to import the CSS file
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const AddPersonalInfo = () => {
    const { token } = AuthAction.getState('solar'); 


    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        gender: '',
        dob: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        alternative_phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/personal-info', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            alert("✅ Information saved successfully!");
        } catch (err) {
            console.error(err);
            alert("⚠️ Failed to save information.");
        }
    };

    return (
        <div className="pi-personal-info-container">
            <div className="pi-form-header">
                <h2>Personal Information</h2>
                <p>Please provide your personal details to complete your profile</p>
            </div>
            
            <form onSubmit={handleSubmit} className="pi-personal-info-form">
                {/* Personal Details Section */}
                <div className="pi-form-section">
                    <h3 className="pi-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Personal Details
                    </h3>
                    
                    <div className="pi-form-row">
                        <div className="pi-form-group">
                            <label className="pi-form-label">First Name</label>
                            <input 
                                name="first_name" 
                                placeholder="First Name" 
                                value={formData.first_name} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                        
                        <div className="pi-form-group">
                            <label className="pi-form-label">Middle Name</label>
                            <input 
                                name="middle_name" 
                                placeholder="Middle Name (Optional)" 
                                value={formData.middle_name} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                    </div>
                    
                    <div className="pi-form-row">
                        <div className="pi-form-group">
                            <label className="pi-form-label">Last Name</label>
                            <input 
                                name="last_name" 
                                placeholder="Last Name" 
                                value={formData.last_name} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                        
                        <div className="pi-form-group">
                            <label className="pi-form-label">Gender</label>
                            <select 
                                name="gender" 
                                value={formData.gender} 
                                onChange={handleChange}
                                className="pi-select"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="pi-form-group">
                        <label className="pi-form-label">Date of Birth</label>
                        <input 
                            type="date" 
                            name="dob" 
                            value={formData.dob} 
                            onChange={handleChange} 
                            className="pi-date-input"
                        />
                    </div>
                </div>
                
                {/* Contact Details Section */}
                <div className="pi-form-section">
                    <h3 className="pi-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        Contact Details
                    </h3>
                    
                    <div className="pi-form-row">
                        <div className="pi-form-group">
                            <label className="pi-form-label">Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Phone Number" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                        
                        <div className="pi-form-group">
                            <label className="pi-form-label">Alternative Phone</label>
                            <input 
                                type="tel" 
                                name="alternative_phone" 
                                placeholder="Alternative Phone" 
                                value={formData.alternative_phone} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Address Details Section */}
                <div className="pi-form-section">
                    <h3 className="pi-form-section-title">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Address Details
                    </h3>
                    
                    <div className="pi-form-group">
                        <label className="pi-form-label">Full Address</label>
                        <input 
                            name="address" 
                            placeholder="Full Address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            className="pi-text-input"
                        />
                    </div>
                    
                    <div className="pi-form-row">
                        <div className="pi-form-group">
                            <label className="pi-form-label">City</label>
                            <input 
                                name="city" 
                                placeholder="City" 
                                value={formData.city} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                        
                        <div className="pi-form-group">
                            <label className="pi-form-label">State/Province</label>
                            <input 
                                name="state" 
                                placeholder="State/Province" 
                                value={formData.state} 
                                onChange={handleChange} 
                                className="pi-text-input"
                            />
                        </div>
                    </div>
                    
                    <div className="pi-form-group">
                        <label className="pi-form-label">Postal Code</label>
                        <input 
                            name="pincode" 
                            placeholder="Postal Code" 
                            value={formData.pincode} 
                            onChange={handleChange} 
                            className="pi-text-input"
                        />
                    </div>
                </div>
                
                <button type="submit" className="pi-submit-button">Save Information</button>
            </form>
        </div>
    );
};

export default AddPersonalInfo;