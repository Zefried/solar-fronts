import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';

const EmployeeDashboard = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = AuthAction.getState('solar');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.get('/api/employee/reports', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReport(res.data);
            } catch (error) {
                console.error('Error fetching report:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [token]);

    if (loading) return <p>Loading...</p>;
    if (!report) return <p>No report data found.</p>;

    return (
        <>
            <h1>Employee Dashboard</h1>
            <p>{report.message}</p>
            <pre>{JSON.stringify(report.user, null, 2)}</pre>
        </>
    );
};

export default EmployeeDashboard;
