import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../../../CustomStateManage/OrgUnits/AuthState";
import DatePicker from "../../../Reusable/DatePicker/DatePicker";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const { token } = AuthAction.getState("solar");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.post(
          "/api/admin/reports",
          selectedDate ? { date: selectedDate.date } : {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [token, selectedDate]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!report) return <div className="no-data">No report data found.</div>;

  const {
    total_employees,
    total_customers,
    completed_customers,
    pending_customers,
    processing_customers,
  } = report;

  const handleClick = (path) => navigate(path);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="date-picker-container">
          <DatePicker onChange={setSelectedDate} />
        </div>
      </div>
      
      <div className="metrics-container">
        <div className="metric-card" onClick={() => handleClick("/admin/view-employee")}>
          <div className="metric-icon employees-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{total_employees}</h3>
            <p className="metric-label">Total Employees</p>
          </div>
        </div>
        
        <div className="metric-card" onClick={() => handleClick("/admin/user-list?status=all")}>
          <div className="metric-icon customers-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{total_customers}</h3>
            <p className="metric-label">Total Customers</p>
          </div>
        </div>
        
        <div className="metric-card" onClick={() => handleClick("/admin/user-list?status=completed")}>
          <div className="metric-icon completed-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{completed_customers}</h3>
            <p className="metric-label">Completed Customers</p>
          </div>
        </div>
        
        <div className="metric-card" onClick={() => handleClick("/admin/user-list?status=pending")}>
          <div className="metric-icon pending-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{pending_customers}</h3>
            <p className="metric-label">Pending Customers</p>
          </div>
        </div>
        
        <div className="metric-card" onClick={() => handleClick("/admin/user-list?status=processing")}>
          <div className="metric-icon processing-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{processing_customers}</h3>
            <p className="metric-label">Processing Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;