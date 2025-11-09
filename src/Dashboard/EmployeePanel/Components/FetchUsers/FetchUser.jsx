import React, { useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import { useLocation } from 'react-router-dom';
import './FetchUser.css';

const FetchUser = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, role } = AuthAction.getState('solar');

  // Get status from URL: /employee/user-list?status=pending
  const { search } = useLocation();
  const status = new URLSearchParams(search).get('status') || 'all';

  const searchUsers = async (name) => {
    if (!name.trim()) return setUsers([]);
    setLoading(true);
    try {
      // Choose API based on role
      const endpoint =
        role === 'admin'
          ? '/api/admin/search/users'
          : '/api/employee/search/users';

      const res = await axios.post(
        endpoint,
        { name, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(res.data.data || []);
    } catch (err) {
      console.error('Search error:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    AuthAction.updateState({
      selectedClient: { id: user.id, name: user.name },
    });

    const event = new CustomEvent('userSelected', { detail: user });
    window.dispatchEvent(event);

    setUsers([]);
    setQuery('');
  };

  return (
    <div className="fu-select-container">
      <input
        type="text"
        className="fu-search-input"
        placeholder={`Search ${status} users by name...`}
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          searchUsers(val);
        }}
      />

      {loading && <span className="fu-loading-text">Searching...</span>}

      {!loading && users.length > 0 && (
        <ul className="fu-user-list" style={{ cursor: 'pointer' }}>
          {users.map((u) => (
            <li
              key={u.id}
              onClick={() => handleSelectUser(u)}
              className="fu-user-item"
            >
              {u.name} {u.phone && `- ${u.phone}`}
            </li>
          ))}
        </ul>
      )}

      {!loading && query && users.length === 0 && (
        <div className="fu-no-users">No {status} users found</div>
      )}
    </div>
  );
};

export default FetchUser;
