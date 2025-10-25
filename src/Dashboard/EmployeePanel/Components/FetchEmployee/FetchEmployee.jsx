import React, { useState } from 'react';
import axios from 'axios';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';


const SearchEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = AuthAction.getState('solar');

    const searchEmployees = async (name) => {
        if (!name.trim()) return setEmployees([]);
        setLoading(true);
        try {
            const res = await axios.get('/api/search/employee/register', {
                params: { name },
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(res.data.data || []);
        } catch (err) {
            console.error('Search error:', err);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectEmployee = (emp) => {
        AuthAction.updateState({
            selectedEmployee: { id: emp.id, name: emp.name }
        });

        const event = new CustomEvent('employeeSelected', { detail: emp });
        window.dispatchEvent(event);

        setEmployees([]);
        setQuery('');
    };

    return (
        <div className="fu-select-container">
            <input
                type="text"
                className="fu-search-input"
                placeholder="Search employee by name..."
                value={query}
                onChange={(e) => {
                    const val = e.target.value;
                    setQuery(val);
                    searchEmployees(val);
                }}
            />

            {loading && <span className="fu-loading-text">Searching...</span>}

            {!loading && employees.length > 0 && (
                <ul className="fu-user-list" style={{ cursor: 'pointer' }}>
                    {employees.map((e) => (
                        <li
                            key={e.id}
                            onClick={() => handleSelectEmployee(e)}
                            className="fu-user-item"
                        >
                            {e.name} {e.phone && `- ${e.phone}`}
                        </li>
                    ))}
                </ul>
            )}

            {!loading && query && employees.length === 0 && (
                <div className="fu-no-users">No employees found</div>
            )}
        </div>
    );
};

export default SearchEmployee;
