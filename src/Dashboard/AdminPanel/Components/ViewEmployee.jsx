import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const ViewEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');

    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            try {
                const res = await axios.get('/api/admin/view/employee', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmployees(res.data.data || []);
            } catch (error) {
                console.error('Error fetching employee info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployeeInfo();
    }, [token]);

    const handleFieldChange = (id, field, value) => {
        setDraftValues(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const handleSaveChanges = async (id) => {
        try {
            const res = await axios.post(`/api/update/employee/${id}`, draftValues[id], {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status === 200) alert('Employee updated successfully');
        } catch (err) {
            console.error('Failed to update employee', err);
            alert('Update failed');
        }
    };

    const renderEditableField = (id, label, field, value, type = 'text') => (
        <p>
            <strong>{label}:</strong>{' '}
            {editingField === `${id}-${field}` ? (
                <input
                    type={type}
                    value={draftValues[id]?.[field] ?? value ?? ''}
                    autoFocus
                    onChange={e => handleFieldChange(id, field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <>
                    {draftValues[id]?.[field] ?? value ?? 'N/A'}
                    <button onClick={() => setEditingField(`${id}-${field}`)}>🖊</button>
                </>
            )}
        </p>
    );

    if (loading) return <p>Loading...</p>;
    if (!employees.length) return <p>No employee data found.</p>;

    return (
        <>
            <h2>Employee List</h2>
            {employees.map(emp => (
                <div key={emp.id} style={{ borderBottom: '1px solid #ccc', marginBottom: 10, paddingBottom: 10 }}>
                    {renderEditableField(emp.id, 'Name', 'name', emp.name)}
                    {renderEditableField(emp.id, 'Email', 'email', emp.email)}
                    {renderEditableField(emp.id, 'Phone', 'phone', emp.phone)}
                    {renderEditableField(emp.id, 'Password', 'pswView', emp.pswView, 'password')}
                    {renderEditableField(emp.id, 'Role', 'role', emp.role)}
                    <button onClick={() => handleSaveChanges(emp.id)} style={{ marginTop: 8 }}>Save Changes</button>
                </div>
            ))}
        </>
    );
};

export default ViewEmployee;
