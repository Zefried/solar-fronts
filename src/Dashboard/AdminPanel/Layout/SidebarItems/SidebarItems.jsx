import react from 'react';
import {useState} from 'react';
import ListItems from './ListItems';
import { Link } from 'react-router-dom';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';



const SidebarItems = () => {
  
    const { role } = AuthAction.getState('solar');

    const dashboardPath = role === 'employee' ? '/employee' : role === 'admin' ? '/admin' : '/';

  return (
    <nav className="sb-sidebar-nav">
      <ul className="sb-sidebar-list">
        <li>
          <Link to={dashboardPath} className="sb-menu-item">
            <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H15.5C16.3284 3 17 3.67157 17 4.5V7.5C17 8.32843 16.3284 9 15.5 9H4.5C3.67157 9 3 8.32843 3 7.5V4.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12.5C3 11.6716 3.67157 11 4.5 11H9.5C10.3284 11 11 11.6716 11 12.5V15.5C11 16.3284 10.3284 17 9.5 17H4.5C3.67157 17 3 16.3284 3 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 12.5C13 11.6716 13.6716 11 14.5 11H15.5C16.3284 11 17 11.6716 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H14.5C13.6716 17 13 16.3284 13 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>User Dashboard</span>
          </Link>
        </li>

        <ListItems />
      </ul>
    </nav>
  );
};

export default SidebarItems;
