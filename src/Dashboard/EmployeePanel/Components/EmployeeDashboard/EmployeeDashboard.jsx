import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import DatePicker from '../../../Reusable/DatePicker/DatePicker';

const EmployeeDashboard = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { token } = AuthAction.getState('solar');
    const [selectedDate, setSelectedDate] = useState(null);

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

    const { user, total_clients, total_pending_clients, total_completed_clients, active_clients } = report;

    const handleClick = (path) => {
        navigate(path); // you’ll connect your real routes later
    };

    const cardStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '6px',
        cursor: 'pointer',
        flex: 1,
        textAlign: 'center'
    };

    const handleDateSelect = (data) => {
        console.log('Received:', data);
        setSelectedDate(data);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Welcome, {user?.name}</h2>
            <p>{report.message}</p>

            <div style={{ padding: '20px' }}>
                <h2>Date Selector Demo</h2>
                <DatePicker onChange={handleDateSelect} />
                {selectedDate && (
                    <p>
                    Date: {selectedDate.date}, Selected: {selectedDate.selected.toString()}
                    </p>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <div style={cardStyle} onClick={() => handleClick('/all-clients')}>
                    <h4>Total Clients</h4>
                    <p>{total_clients}</p>
                </div>
                <div style={cardStyle} onClick={() => handleClick('/pending-clients')}>
                    <h4>Pending Clients</h4>
                    <p>{total_pending_clients}</p>
                </div>
                <div style={cardStyle} onClick={() => handleClick('/completed-clients')}>
                    <h4>Completed Clients</h4>
                    <p>{total_completed_clients}</p>
                </div>
                <div style={cardStyle} onClick={() => handleClick('/active-clients')}>
                    <h4>Active Clients</h4>
                    <p>{active_clients}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
