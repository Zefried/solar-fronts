import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const ViewBankInfo = () => {
    const [bankInfo, setBankInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const {token} = AuthAction.getState('solar');

    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {

        const fetchBankInfo = async () => {
            try {
                const res = await axios.get('/api/user/bank-info/fetch',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

                if(res.data.status === 422){
                    alert(res.data.message);    
                }

                setBankInfo(res.data.data);
                setDraftValues(res.data.data);
            } catch (error) {
                console.error('Error fetching bank info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBankInfo();
    }, []);

    const handleFieldChange = (field, value) => {
        setDraftValues({ ...draftValues, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const res = await axios.post('/api/user/update/bank-info', draftValues, {
                headers: { Authorization: `Bearer ${token}` }
            });
                   
            if(res.data.status === 200){
                alert('Bank info updated successfully');
                setBankInfo(draftValues);
            }
        } catch (err) {
            console.error('Failed to update bank info', err);
            alert('Update failed');
        }
    };

    const renderEditableField = (label, field, type = 'text') => (
        <p>
            <strong>{label}:</strong>{' '}
            {editingField === field ? (
                <input
                    type={type}
                    value={draftValues[field] || ''}
                    autoFocus
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <>
                    {draftValues[field] || 'N/A'}
                    <button style={{ marginLeft: '5px', border: 'none' }} onClick={() => setEditingField(field)}>🖊</button>
                </>
            )}
        </p>
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!bankInfo) {
        return <p>No bank information found.</p>;
    }

    return (
        <>
            <h2>Bank Information</h2>
            {renderEditableField('Account Holder Name', 'account_holder_name')}
            {renderEditableField('Account Number', 'account_number')}
            {renderEditableField('Bank Name', 'bank_name')}
            {renderEditableField('IFSC Code', 'ifsc_code')}
            {renderEditableField('Branch Name', 'branch_name')}

            <button style={{ marginTop: '15px', padding: '6px 12px', cursor: 'pointer' }} onClick={handleSaveChanges}>
                Save Changes
            </button>
        </>
    );
};

export default ViewBankInfo;
