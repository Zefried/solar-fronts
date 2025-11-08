import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { Link } from 'react-router-dom';
import FetchUser from '../FetchUsers/FetchUser';

const UserListReport = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = AuthAction.getState('solar');

  useEffect(() => {
    const fetchUserReport = async () => {
      try {
        const res = await axios.get('/api/get/user/report', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.status === 200) setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching user report:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserReport();

    const handleUserSelected = (e) => setUsers([e.detail]);
    window.addEventListener('userSelected', handleUserSelected);
    return () => window.removeEventListener('userSelected', handleUserSelected);
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (!users.length) return <p>No user report data found.</p>;

  return (
    <div>
      <h2>User Report</h2>
      <FetchUser />
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Password</th><th>Employee</th><th>Actions</th>
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
                <Link to={`/user-bank-info/${u.id}`}>Bank</Link> | 
                <Link to={`/user-doc-info/${u.id}`}>Docs</Link> | 
                <Link to={`/user-personal-info/${u.id}`}>Personal</Link> | 
                <Link to={`/user-extra-info/${u.id}`}>Extra</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListReport;
