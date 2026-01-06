import axios from 'axios';
import React, { useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import './AddEmployee.css';

const AddEmployee = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', pswView: '', role: 'employee' });
    const { token } = AuthAction.getState('solar');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        // Basic validation
        if (!form.name || !form.email || !form.phone || !form.pswView) {
            alert('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post('/api/admin/add/employee', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status === 200) {
                alert('Employee added successfully');
                setForm({ name: '', email: '', phone: '', pswView: '', role: 'employee' });
            }
        } catch (err) {
            console.error('Error adding employee:', err);
            alert('Failed to add employee');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ae-container">
            <div className="ae-form-card">
                <h2 className="ae-form-title">Add New Employee</h2>
                <p className="ae-form-subtitle">Create a new employee account with access to the system</p>
                
                <div className="ae-form-group">
                    <label className="ae-form-label">Full Name</label>
                    <input 
                        name="name" 
                        placeholder="Enter employee's full name" 
                        value={form.name} 
                        onChange={handleChange} 
                        className="ae-text-input"
                    />
                </div>
                
                <div className="ae-form-group">
                    <label className="ae-form-label">Email Address</label>
                    <input 
                        name="email" 
                        type="email"
                        placeholder="Enter email address" 
                        value={form.email} 
                        onChange={handleChange} 
                        className="ae-text-input"
                    />
                </div>
                
                <div className="ae-form-group">
                    <label className="ae-form-label">Phone Number</label>
                    <input 
                        name="phone" 
                        type="tel"
                        placeholder="Enter phone number" 
                        value={form.phone} 
                        onChange={handleChange} 
                        className="ae-text-input"
                    />
                </div>
                
                <div className="ae-form-group">
                    <label className="ae-form-label">Password</label>
                    <input 
                        name="pswView" 
                        type="password" 
                        placeholder="Enter password" 
                        value={form.pswView} 
                        onChange={handleChange} 
                        className="ae-text-input"
                    />
                </div>
                
                <div className="ae-form-group">
                    <label className="ae-form-label">Role</label>
                    <select name="role" value={form.role} onChange={handleChange} className="ae-select">
                        <option value="employee">Employee</option>
                        <option value="admin">Sub-Admin</option>
                    </select>
                </div>
                
                <button 
                    onClick={handleSubmit} 
                    className={`ae-submit-button ${isSubmitting ? 'ae-submitting' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="ae-spinner"></span>
                            Adding Employee...
                        </>
                    ) : (
                        'Add Employee'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddEmployee;