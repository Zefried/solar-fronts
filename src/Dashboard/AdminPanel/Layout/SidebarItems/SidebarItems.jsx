import react from 'react';
import {useState} from 'react';
import ListItems from './ListItems';

const SidebarItems = () => {
    


    return (
        <>
        <nav className="sb-sidebar-nav">
            <ul className="sb-sidebar-list">
            <li>
                <a href="#" className="sb-menu-item">
                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H15.5C16.3284 3 17 3.67157 17 4.5V7.5C17 8.32843 16.3284 9 15.5 9H4.5C3.67157 9 3 8.32843 3 7.5V4.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12.5C3 11.6716 3.67157 11 4.5 11H9.5C10.3284 11 11 11.6716 11 12.5V15.5C11 16.3284 10.3284 17 9.5 17H4.5C3.67157 17 3 16.3284 3 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 12.5C13 11.6716 13.6716 11 14.5 11H15.5C16.3284 11 17 11.6716 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H14.5C13.6716 17 13 16.3284 13 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Dashboard</span>
                </a>
            </li>

            <ListItems />

            <li>
                <a href="#" className="sb-menu-item sb-logout">
                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4.5H5.5C4.67157 4.5 4 5.17157 4 6V14C4 14.8284 4.67157 15.5 5.5 15.5H7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5L13.5 9L10 5.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.5 9H8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Logout</span>
                </a>
            </li>
            </ul>
        </nav>
        </>
    )
}

export default SidebarItems;