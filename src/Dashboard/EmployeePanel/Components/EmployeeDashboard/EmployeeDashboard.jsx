import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import DatePicker from '../../../Reusable/DatePicker/DatePicker';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { token } = AuthAction.getState('solar');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.post('/api/employee/reports',
                    selectedDate ? { date: selectedDate.date } : {}, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setReport(res.data);
            } catch (err) {
                console.error('Error fetching report:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [token, selectedDate]);

    const handleClick = (path) => {
        navigate(path);
    };

    const handleDateSelect = (data) => {
        setSelectedDate(data);
    };

    if (loading) return (
        <div className="ed-dashboard-container">
            <div className="ed-loading-container">
                <div className="ed-loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        </div>
    );
    
    if (!report) return (
        <div className="ed-dashboard-container">
            <div className="ed-error-container">
                <div className="ed-error-icon">⚠️</div>
                <p>No report data found.</p>
            </div>
        </div>
    );

    const { user, total_clients, total_pending_clients, total_completed_clients, active_clients } = report;

    return (
        <div className="ed-dashboard-container">
            <div className="ed-header">
                <div className="ed-welcome-section">
                    <h1 className="ed-welcome-title">Welcome back, {user?.name}</h1>
                    <p className="ed-dashboard-subtitle">Here's an overview of your client statistics</p>
                </div>
                
                <div className="ed-date-filter">
                    <div className="ed-date-picker-wrapper">
                        <DatePicker onChange={handleDateSelect} />
                        {selectedDate && (
                            <div className="ed-selected-date">
                                <span className="ed-date-label">Filtering by:</span>
                                <span className="ed-date-value">{selectedDate.date}</span>
                                <button 
                                    className="ed-clear-date" 
                                    onClick={() => setSelectedDate(null)}
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="ed-stats-grid">
                <div className="ed-stat-card" onClick={() => handleClick('/employee/user-list?status=all')}>
                    <div className="ed-stat-icon-container">
                        <div className="ed-stat-icon total-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="ed-stat-content">
                        <h3 className="ed-stat-title">Total Clients</h3>
                        <p className="ed-stat-value">{total_clients}</p>
                    </div>
                </div>
                
                <div className="ed-stat-card" onClick={() => handleClick('/employee/user-list?status=pending')}>
                    <div className="ed-stat-icon-container">
                        <div className="ed-stat-icon pending-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="ed-stat-content">
                        <h3 className="ed-stat-title">Pending</h3>
                        <p className="ed-stat-value">{total_pending_clients}</p>
                    </div>
                </div>
                
                <div className="ed-stat-card" onClick={() => handleClick('/employee/user-list?status=completed')}>
                    <div className="ed-stat-icon-container">
                        <div className="ed-stat-icon completed-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="ed-stat-content">
                        <h3 className="ed-stat-title">Completed</h3>
                        <p className="ed-stat-value">{total_completed_clients}</p>
                    </div>
                </div>
                
                <div className="ed-stat-card" onClick={() => handleClick('/employee/user-list?status=processing')}>
                    <div className="ed-stat-icon-container">
                        <div className="ed-stat-icon active-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="ed-stat-content">
                        <h3 className="ed-stat-title">Active</h3>
                        <p className="ed-stat-value">{active_clients}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;