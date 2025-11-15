import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { Link, useLocation } from 'react-router-dom';
import FetchUser from '../FetchUsers/FetchUser';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = AuthAction.getState('solar');
  const { search } = useLocation();

  // Get status from query string (?status=pending)
  const status = new URLSearchParams(search).get('status') || 'all';

  console.log('Status:', status);
  
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await axios.post(
          '/api/get/user/list',
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data?.status === 200) setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();

    const handleUserSelected = (e) => setUsers([e.detail]);
    window.addEventListener('userSelected', handleUserSelected);
    return () => window.removeEventListener('userSelected', handleUserSelected);
  }, [token, status]);

  if (loading) return (
    <div className="ul-loading">
      <div className="ul-loading-spinner"></div>
      <span>Loading users...</span>
    </div>
  );
  
  if (!users.length) return (
    <div className="ul-empty">
      No {status} users found.
    </div>
  );

  return (
    <div className="ul-container">
      <h2 className="ul-header">User List ({status})</h2>
      <div className="ul-search-container">
        <FetchUser />
      </div>
      <div className="ul-table-wrapper">
        <table className="ul-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Password</th>
              <th>Employee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 10).map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.pswView}</td>
                <td>{u.employee_name || '—'}</td>
                <td>
                  <Link to={`/employee/user-bank-info/${u.id}`} className="ul-action-link">Bank</Link>
                  <span className="ul-action-separator">|</span>
                  <Link to={`/employee/user-doc-info/${u.id}`} className="ul-action-link">Docs</Link>
                  <span className="ul-action-separator">|</span>
                  <Link to={`/employee/user-personal-info/${u.id}`} className="ul-action-link">Personal</Link>
                  <span className="ul-action-separator">|</span>
                  <Link to={`/employee/user-extra-info/${u.id}`} className="ul-action-link">Extra</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;