import axios from 'axios';
import React, { useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';


const PersonalInfo = () => {

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
            alert("Information saved!");
        } catch (err) {
            console.error(err);
            alert("Failed to save information.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange}  /><br />
                        <input name="middle_name" placeholder="Middle Name (Optional)" value={formData.middle_name} onChange={handleChange} /><br />
                        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange}  /><br />
                        <select name="gender" value={formData.gender} onChange={handleChange} >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select><br />
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange}  /><br />
                        <input name="address" placeholder="Full Address" value={formData.address} onChange={handleChange}  /><br />
                        <input name="city" placeholder="City" value={formData.city} onChange={handleChange}  /><br />
                        <input name="state" placeholder="State/Province" value={formData.state} onChange={handleChange}  /><br />
                        <input name="pincode" placeholder="Postal Code" value={formData.pincode} onChange={handleChange}  /><br />
                        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}  /><br />
                        <input type="tel" name="alternative_phone" placeholder="Alternative Phone " value={formData.alternative_phone} onChange={handleChange} /><br />
                        <button type="submit">Save</button>
            </form>
        </div>
     
    );
};

export default PersonalInfo;
