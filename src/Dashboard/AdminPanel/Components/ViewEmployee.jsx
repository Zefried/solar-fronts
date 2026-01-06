import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import './ViewEmployee.css';

const ViewEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [draftValues, setDraftValues] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);
    const { token } = AuthAction.getState('solar');

    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            try {
                const res = await axios.get('/api/admin/view/employee', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmployees(res.data.data || []);
                // Initialize draft values with fetched data
                const initialDraftValues = {};
                res.data.data?.forEach(emp => {
                    initialDraftValues[emp.id] = { ...emp };
                });
                setDraftValues(initialDraftValues);
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
        setSavingId(id);
        try {
            const res = await axios.post(`/api/admin/update/employee/${id}`, draftValues[id], {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status === 200) {
                alert('Employee updated successfully');
                // Update the employee in the main array
                setEmployees(prev => 
                    prev.map(emp => emp.id === id ? { ...emp, ...draftValues[id] } : emp)
                );
            }
        } catch (err) {
            console.error('Failed to update employee', err);
            alert('Update failed');
        } finally {
            setSavingId(null);
        }
    };

    const renderEditableField = (id, label, field, value, type = 'text') => (
        <div className="ve-field-container">
            <span className="ve-field-label">{label}</span>
            {editingField === `${id}-${field}` ? (
                <input
                    type={type}
                    className="ve-field-input"
                    value={draftValues[id]?.[field] ?? value ?? ''}
                    autoFocus
                    onChange={e => handleFieldChange(id, field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingField(null)}
                />
            ) : (
                <div className="ve-field-value">
                    <span>{draftValues[id]?.[field] ?? value ?? 'N/A'}</span>
                    <button 
                        className="ve-edit-button" 
                        onClick={() => setEditingField(`${id}-${field}`)}
                        aria-label={`Edit ${label}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );

    if (loading) return (
        <div className="ve-container">
            <div className="ve-loading-container">
                <div className="ve-loading-spinner"></div>
                <p>Loading employee data...</p>
            </div>
        </div>
    );
    
    if (!employees.length) return (
        <div className="ve-container">
            <div className="ve-error-container">
                <div className="ve-error-icon">⚠️</div>
                <p>No employee data found.</p>
            </div>
        </div>
    );

    return (
        <div className="ve-container">
            <div className="ve-header">
                <h2 className="ve-title">Employee Management</h2>
                <p className="ve-subtitle">View and edit employee information</p>
            </div>
            
            <div className="ve-employee-grid">
                {employees.map(emp => (
                    <div key={emp.id} className="ve-employee-card">
                        <div className="ve-card-header">
                            <h3 className="ve-employee-name">{emp.name}</h3>
                            <span className={`ve-role-badge ${emp.role === 'admin' ? 've-admin' : 've-employee'}`}>
                                {emp.role === 'admin' ? 'Sub-Admin' : 'Employee'}
                            </span>
                        </div>
                        
                        <div className="ve-card-body">
                            {renderEditableField(emp.id, 'Name', 'name', emp.name)}
                            {renderEditableField(emp.id, 'Email', 'email', emp.email)}
                            {renderEditableField(emp.id, 'Phone', 'phone', emp.phone)}
                            {renderEditableField(emp.id, 'Password', 'pswView', emp.pswView, 'password')}
                            {renderEditableField(emp.id, 'Role', 'role', emp.role)}
                        </div>
                        
                        <div className="ve-card-footer">
                            <button 
                                onClick={() => handleSaveChanges(emp.id)} 
                                className={`ve-save-button ${savingId === emp.id ? 've-saving' : ''}`}
                                disabled={savingId === emp.id}
                            >
                                {savingId === emp.id ? (
                                    <>
                                        <span className="ve-button-spinner"></span>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewEmployee;