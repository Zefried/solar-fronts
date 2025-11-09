import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../../../CustomStateManage/OrgUnits/AuthState";
import DatePicker from "../../../Reusable/DatePicker/DatePicker";

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

  if (loading) return <p>Loading...</p>;
  if (!report) return <p>No report data found.</p>;

  const {
    total_employees,
    total_customers,
    completed_customers,
    pending_customers,
    processing_customers,
  } = report;

  const handleClick = (path) => navigate(path);
  const cardStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
    textAlign: "center",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <DatePicker onChange={setSelectedDate} />
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <div style={cardStyle} onClick={() => handleClick("/admin/view-employee")}>
          <h4>Total Employees</h4>
          <p>{total_employees}</p>
        </div>
        <div style={cardStyle} onClick={() => handleClick("/admin/user-list?status=all")}>
          <h4>Total Customers</h4>
          <p>{total_customers}</p>
        </div>
        <div style={cardStyle} onClick={() => handleClick("/admin/user-list?status=completed")}>
          <h4>Completed Customers</h4>
          <p>{completed_customers}</p>
        </div>
        <div style={cardStyle} onClick={() => handleClick("/admin/user-list?status=pending")}>
          <h4>Pending Customers</h4>
          <p>{pending_customers}</p>
        </div>
        <div style={cardStyle} onClick={() => handleClick("/admin/user-list?status=processing")}>
          <h4>Processing Customers</h4>
          <p>{processing_customers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
