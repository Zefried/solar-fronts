import React, { useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import './FetchUser.css';

const FetchUser = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = AuthAction.getState('solar');

    const searchUsers = async (name) => {
        if (!name.trim()) return setUsers([]);
        setLoading(true);
        try {
            const res = await axios.get('/api/employee/search/users', {
                params: { name },
                headers: { Authorization: `Bearer ${token}` }
            });
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
            selectedClient: { id: user.id, name: user.name }
        });

        const event = new CustomEvent('userSelected', { detail: user });
        window.dispatchEvent(event);

        // Clearing search
        setUsers([]);
        setQuery('');
    };

    return (
        <div className="fu-select-container">
            <input
                type="text"
                className="fu-search-input"
                placeholder="Search user by name..."
                value={query}
                onChange={(e) => {
                    const val = e.target.value;
                    setQuery(val);
                    searchUsers(val);
                }}
            />

            {loading && <span className="fu-loading-text">Searching...</span>}

            {!loading && users.length > 0 && (
                <ul className="fu-user-list" style={{cursor:'pointer'}}>
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
                <div className="fu-no-users">No users found</div>
            )}
        </div>
    );
};

export default FetchUser;
