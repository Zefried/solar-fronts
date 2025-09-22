import React, { useState } from 'react';
import './Clients.css';

const Clients = () => {
  const [filter, setFilter] = useState('pending'); // 'pending' or 'new'
  
  // Fake data for pending clients
  const pendingClients = [
    { id: 1, name: 'John Smith', phone: '+1 (555) 123-4567', appliedDate: '2023-05-15' },
    { id: 2, name: 'Emma Johnson', phone: '+1 (555) 987-6543', appliedDate: '2023-05-18' },
    { id: 3, name: 'Michael Brown', phone: '+1 (555) 456-7890', appliedDate: '2023-05-20' },
    { id: 4, name: 'Sarah Davis', phone: '+1 (555) 234-5678', appliedDate: '2023-05-22' },
    { id: 5, name: 'Robert Wilson', phone: '+1 (555) 876-5432', appliedDate: '2023-05-25' },
  ];
  
  // Fake data for new clients
  const newClients = [
    { id: 6, name: 'Jennifer Taylor', phone: '+1 (555) 345-6789', appliedDate: '2023-05-28' },
    { id: 7, name: 'William Martinez', phone: '+1 (555) 765-4321', appliedDate: '2023-05-30' },
    { id: 8, name: 'Lisa Anderson', phone: '+1 (555) 567-8901', appliedDate: '2023-06-01' },
    { id: 9, name: 'David Thomas', phone: '+1 (555) 234-5678', appliedDate: '2023-06-03' },
    { id: 10, name: 'Susan Jackson', phone: '+1 (555) 890-1234', appliedDate: '2023-06-05' },
  ];
  
  // Get clients based on current filter
  const filteredClients = filter === 'pending' ? pendingClients : newClients;
  
  return (
    <div className="clients-container">
      <div className="clients-header">
        <h1>Clients</h1>
        <p>Manage and view client information</p>
      </div>
      
      <div className="clients-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending Clients
          </button>
          <button 
            className={`filter-button ${filter === 'new' ? 'active' : ''}`}
            onClick={() => setFilter('new')}
          >
            New Clients
          </button>
        </div>
        
        <div className="search-box">
          <input type="text" placeholder="Search clients..." />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="clients-table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td className="client-name">{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.appliedDate}</td>
                <td>
                  <button className="view-docs-button">
                    View Docs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="clients-pagination">
        <div className="pagination-info">
          Showing 1 to {filteredClients.length} of {filteredClients.length} entries
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

export default Clients;