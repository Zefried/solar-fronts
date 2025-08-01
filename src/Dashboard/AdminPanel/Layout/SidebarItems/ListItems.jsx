import { useState } from "react";

const ListItems = () => {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);


  return (      
    <> 
       <li>
            <div className="sb-parent">
                <button 
                    className="sb-dropdown" 
                    onClick={() => setIsUsersOpen(!isUsersOpen)}
                    aria-expanded={isUsersOpen}
                >
                    <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Users</span>
                    <svg className={`sb-arrow ${isUsersOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <ul className={`sb-submenu ${isUsersOpen ? 'sb-submenu-open' : ''}`}>
                    <li>
                    <a href="#" className="sb-submenu-item">
                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        All Users
                    </a>
                    </li>
                    <li>
                    <a href="#" className="sb-submenu-item">
                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5V14.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.5 5.5L8 1.5L11.5 5.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add User
                    </a>
                    </li>
                </ul>
            </div>
       </li>

       <li>
            <div className="sb-parent">
                <button 
                    className="sb-dropdown" 
                    onClick={() => setIsEmployeesOpen(!isEmployeesOpen)}
                    aria-expanded={isEmployeesOpen}
                >
                    <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Employee</span>
                    <svg className={`sb-arrow ${isEmployeesOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <ul className={`sb-submenu ${isEmployeesOpen ? 'sb-submenu-open' : ''}`}>
                    <li>
                    <a href="#" className="sb-submenu-item">
                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        All Users
                    </a>
                    </li>
                    <li>
                    <a href="#" className="sb-submenu-item">
                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5V14.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.5 5.5L8 1.5L11.5 5.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add User
                    </a>
                    </li>
                </ul>
            </div>
       </li>     
    </>
  )
}

export default ListItems;