import React, { useState } from 'react';
import './Employee.css';

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Updated employee data with Indian names, phone numbers, and solar designations
  const employees = [
    { id: 1, name: 'Rajesh Kumar', position: 'Solar Installer', department: 'Installation', email: 'rajesh@example.com', phone: '+91 98765 43210', joinDate: '2022-01-15', status: 'Active' },
    { id: 2, name: 'Priya Sharma', position: 'Solar Agent', department: 'Sales', email: 'priya@example.com', phone: '+91 87654 32109', joinDate: '2022-02-20', status: 'Active' },
    { id: 3, name: 'Amit Patel', position: 'Solar Installer', department: 'Installation', email: 'amit@example.com', phone: '+91 76543 21098', joinDate: '2022-03-10', status: 'On Leave' },
    { id: 4, name: 'Sunita Reddy', position: 'Solar Agent', department: 'Sales', email: 'sunita@example.com', phone: '+91 65432 10987', joinDate: '2021-11-05', status: 'Active' },
    { id: 5, name: 'Vikram Singh', position: 'Solar Installer', department: 'Installation', email: 'vikram@example.com', phone: '+91 54321 09876', joinDate: '2022-04-18', status: 'Active' },
    { id: 6, name: 'Anita Desai', position: 'Solar Agent', department: 'Sales', email: 'anita@example.com', phone: '+91 43210 98765', joinDate: '2021-09-12', status: 'Active' },
    { id: 7, name: 'Sanjay Gupta', position: 'Solar Installer', department: 'Installation', email: 'sanjay@example.com', phone: '+91 32109 87654', joinDate: '2022-05-22', status: 'Active' },
    { id: 8, name: 'Meena Joshi', position: 'Solar Agent', department: 'Sales', email: 'meena@example.com', phone: '+91 21098 76543', joinDate: '2021-08-30', status: 'Active' },
  ];
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'status-active';
      case 'On Leave':
        return 'status-leave';
      case 'Inactive':
        return 'status-inactive';
      default:
        return 'status-active';
    }
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h1>Employees</h1>
        <p>Manage and view employee information</p>
      </div>
      
      <div className="employee-controls">
        <div className="employee-actions">
          <button className="add-employee-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Employee
          </button>
        </div>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td className="employee-name">{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.joinDate}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button view-button" title="View">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="action-button edit-button" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="action-button delete-button" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="employee-pagination">
        <div className="pagination-info">
          Showing 1 to {filteredEmployees.length} of {filteredEmployees.length} entries
        </div>
        <div className="pagination-controls">
          <button className="pagination-button" disabled>
            Previous
          </button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;