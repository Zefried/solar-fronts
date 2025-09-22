import axios from 'axios';
import React, { useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const DocumentUploadForm = () => {
    const { token } = AuthAction.getState('solar');

    const [formData, setFormData] = useState({
        idProofFront: null,
        idProofBack: null,
        idProofNumber: '',
        panCard: null,
        panNumber: '',
        cancelledCheque: null,
        electricityBill: null,
        consumerNumber: '',
        userId:2
    });

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        // Append all fields, including null checks
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                payload.append(key, value);
            }
        });

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
            
            if(res.data.status == 404){
                alert(res.data.message);
            }

        } catch (err) {
            console.error("Upload failed:", err.response?.data || err.message);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>ID Proof (Front):</label>
                    <input type="file" name="idProofFront" onChange={handleChange}  />
                    <input type="text" name="idProofNumber" placeholder="ID Proof Number" value={formData.idProofNumber} onChange={handleChange}  />
                </div>

                <div>
                    <label>ID Proof (Back):</label>
                    <input type="file" name="idProofBack" onChange={handleChange} />
                </div>

                <div>
                    <label>PAN Card:</label>
                    <input type="file" name="panCard" onChange={handleChange}  />
                    <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange}  />
                </div>

                <div>
                    <label>Cancelled Cheque:</label>
                    <input type="file" name="cancelledCheque" onChange={handleChange} />
                </div>

                <div>
                    <label>Electricity Bill:</label>
                    <input type="file" name="electricityBill" onChange={handleChange}  />
                    <input type="text" name="consumerNumber" placeholder="Consumer Number" value={formData.consumerNumber} onChange={handleChange}  />
                </div>

                <button type="submit">Submit</button>
        </form>

        </>
     
    );
};

export default DocumentUploadForm;
