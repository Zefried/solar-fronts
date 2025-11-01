import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const ViewEmployeeUser = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeUsers, setEmployeeUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');
    const baseUrl = 'http://127.0.0.1:8000/';

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get('/api/admin/employee/list', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const simplified = (res.data.data || []).map(emp => ({
                    id: emp.id,
                    name: emp.name,
                }));
                setEmployees(simplified);
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, [token]);

    const handleSelect = async (e) => {
        const empId = e.target.value;
        if (!empId) return;
        try {
            const res = await axios.get(`/api/admin/employee/users/${empId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployeeUsers(res.data.data || []);
        } catch (error) {
            console.error('Error fetching employee user data:', error);
        }
    };

    const td = { border: '1px solid #ddd', padding: '6px' };

    const renderList = (data) => (
        <ul style={{ marginTop: '5px', paddingLeft: '20px', listStyleType: 'disc' }}>
            {Object.entries(data)
                .filter(([key]) => !['id', 'user_id', 'created_at', 'updated_at'].includes(key))
                .map(([key, value]) => {
                    const displayValue =
                        typeof value === 'string' && value.includes('user_docs/')
                            ? <a href={`${baseUrl}${value.replace(/\\/g, '')}`} target="_blank" rel="noreferrer">View File</a>
                            : value ?? 'N/A';
                    return (
                        <li key={key}>
                            <strong>{key.replace(/_/g, ' ')}:</strong> {displayValue}
                        </li>
                    );
                })}
        </ul>
    );

    if (loading) return <p>Loading...</p>;
    if (!employees.length) return <p>No employees found.</p>;

    return (
        <>
            <h2>Select Employee</h2>
            <select onChange={handleSelect}>
                <option value="">-- Select Employee --</option>
                {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                        {emp.name}
                    </option>
                ))}
            </select>

            {employeeUsers.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                    <h3>Associated Users with KYC Details</h3>
                    {employeeUsers.map(user => {
                        const kyc = user.kyc_track;
                        return (
                            <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px', borderRadius: '8px' }}>
                                <h4>{user.name} ({user.phone})</h4>
                                {kyc ? (
                                    <>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                    <th style={td}>Status</th>
                                                    <th style={td}>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={td}>Doc Status</td>
                                                    <td style={td}>
                                                        {kyc.user_doc_status && kyc.documents && Object.keys(kyc.documents).length > 0 ? '✅' : '❌'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={td}>Profile Status</td>
                                                    <td style={td}>
                                                        {kyc.user_profile_status && kyc.personal_info && Object.keys(kyc.personal_info).length > 0 ? '✅' : '❌'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={td}>Bank Status</td>
                                                    <td style={td}>
                                                        {kyc.user_bank_status && kyc.bank_info && Object.keys(kyc.bank_info).length > 0 ? '✅' : '❌'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={td}>Extra Info Status</td>
                                                    <td style={td}>
                                                        {kyc.user_extra_status && kyc.extra_info && Object.keys(kyc.extra_info).length > 0 ? '✅' : '❌'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={td}>KYC Status</td>
                                                    <td style={td}>{kyc.user_kyc_status}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {kyc.documents && (
                                            <details style={{ marginTop: '8px' }}>
                                                <summary>📁 Documents</summary>
                                                {renderList(kyc.documents)}
                                            </details>
                                        )}
                                        {kyc.personal_info && (
                                            <details style={{ marginTop: '8px' }}>
                                                <summary>👤 Personal Info</summary>
                                                {renderList(kyc.personal_info)}
                                            </details>
                                        )}
                                        {kyc.bank_info && (
                                            <details style={{ marginTop: '8px' }}>
                                                <summary>🏦 Bank Info</summary>
                                                {renderList(kyc.bank_info)}
                                            </details>
                                        )}
                                        {kyc.extra_info && (
                                            <details style={{ marginTop: '8px' }}>
                                                <summary>🏗️ Extra Info</summary>
                                                {renderList(kyc.extra_info)}
                                            </details>
                                        )}
                                    </>
                                ) : (
                                    <p>No KYC data available.</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default ViewEmployeeUser;
