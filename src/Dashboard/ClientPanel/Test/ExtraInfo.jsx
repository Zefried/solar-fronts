import axios from 'axios';
import React, { useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const Extrainfo = () => {

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
            alert("Extra info saved!");
        } catch (err) {
            console.error(err);
            alert("Failed to save extra info.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Installation Address Same as Personal?
                    <input
                        type="checkbox"
                        name="installation_address"
                        checked={formData.installation_address}
                        onChange={handleChange}
                    />
                </label><br />
                <input name="village" placeholder="Village" value={formData.village} onChange={handleChange} /><br />
                <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} /><br />
                <input name="district" placeholder="District" value={formData.district} onChange={handleChange} /><br />
                <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} /><br />
                <input name="state" placeholder="State" value={formData.state} onChange={handleChange} /><br />
                <input name="proposed_capacity" placeholder="Proposed Capacity (kW)" value={formData.proposed_capacity} onChange={handleChange} /><br />
                <select name="plot_type" value={formData.plot_type} onChange={handleChange}>
                    <option value="">Select Plot Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                </select><br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Extrainfo;
