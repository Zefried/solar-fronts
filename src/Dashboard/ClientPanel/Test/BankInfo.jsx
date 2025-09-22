import axios from 'axios';
import React, { useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const BankInfo = () => {

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
            alert("Bank information saved!");
        } catch (err) {
            console.error(err);
            alert("Failed to save bank information.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="account_holder_name" 
                    placeholder="Account Holder Name" 
                    value={formData.account_holder_name} 
                    onChange={handleChange} 
                /><br />
                <input 
                    name="account_number" 
                    placeholder="Account Number" 
                    value={formData.account_number} 
                    onChange={handleChange} 
                /><br />
                <input 
                    name="bank_name" 
                    placeholder="Bank Name" 
                    value={formData.bank_name} 
                    onChange={handleChange} 
                /><br />
                <input 
                    name="branch_name" 
                    placeholder="Branch Name" 
                    value={formData.branch_name} 
                    onChange={handleChange} 
                /><br />
                <input 
                    name="ifsc_code" 
                    placeholder="IFSC Code" 
                    value={formData.ifsc_code} 
                    onChange={handleChange} 
                /><br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default BankInfo;
