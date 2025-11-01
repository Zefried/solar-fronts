import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const ViewEmployeeUser = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeUserData, setEmployeeUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');

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
    }, []);

    const handleSelect = async (e) => {
        const empId = e.target.value;
        if (!empId) return;
        try {
            const res = await axios.get(`/api/admin/employee/test/${empId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setEmployeeUserData(res.data);
        } catch (error) {
            console.error('Error fetching employee user data:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!employees.length) return <p>No employee users found.</p>;

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

            {employeeUserData && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Employee User Data</h3>
                    <pre>{JSON.stringify(employeeUserData, null, 2)}</pre>
                </div>
            )}
        </>
    );
};

export default ViewEmployeeUser;
