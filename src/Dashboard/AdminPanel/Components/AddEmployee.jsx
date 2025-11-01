// React: AddEmployee.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const AddEmployee = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', pswView: '', role: 'employee' });
    const { token } = AuthAction.getState('solar');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
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
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto' }}>
            <h2>Add Employee</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br/>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br/>
            <input name="pswView" type="password" placeholder="Password" value={form.pswView} onChange={handleChange} /><br/>
            <select name="role" value={form.role} onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="admin">Sub-Admin</option>
            </select><br/>
            <button onClick={handleSubmit} style={{ marginTop: 10 }}>Add Employee</button>
        </div>
    );
};

export default AddEmployee;
