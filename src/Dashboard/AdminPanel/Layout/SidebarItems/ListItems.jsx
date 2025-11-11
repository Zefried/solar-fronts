import { useState } from "react";
import { AuthAction } from "../../../../CustomStateManage/OrgUnits/AuthState";
import { Link } from "react-router-dom";

const ListItems = () => {

    const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);  
    const [isAddDocument, setAddDocument] = useState(false);
    const [isViewDocument, setViewDocument] = useState(false);
    const {role} = AuthAction.getState('solar');

    let UserPanel = null;
    let AdminPanel = null;
    let EmployeePanel = null;

    console.log("Role in sidebar:", role);

    if(role == 'user'){
       UserPanel = (
        <>
            <li>
                <div className="sb-parent">
                    <button 
                        className="sb-dropdown" 
                        onClick={() => setAddDocument(!isAddDocument)}
                        aria-expanded={isAddDocument}
                    >
                        <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Add Documents</span>
                        <svg className={`sb-arrow ${isAddDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <ul className={`sb-submenu ${isAddDocument ? 'sb-submenu-open' : ''}`}>
                        <li>
                        <Link to={'/client/upload-documents'} className="sb-submenu-item">
                            {/* ID card icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 5h18v14H3V5z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 9h4M7 13h2M15 13h2M11 17h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Upload ID proofs
                        </Link>
                        </li>

                        <li>
                            <Link to={'/client/add-bank-info'} className="sb-submenu-item">
                                {/* Bank icon */}
                                <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M3 10h18L12 3 3 10z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M4 10v10h16V10" stroke="#6B7280" strokeWidth="1.5"/>
                                <path d="M9 14h6" stroke="#6B7280" strokeWidth="1.5"/>
                                </svg>
                                Add Bank Info
                            </Link>
                        </li>

                        <li>
                        <Link to={'/client/add-personal-info'} className="sb-submenu-item">
                            {/* User / Profile icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="7" r="4" stroke="#6B7280" strokeWidth="1.5"/>
                            <path d="M5.5 21c0-3.6 3-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Add Personal Info
                        </Link>
                        </li>

                        <li>
                        <Link to={'/client/add-extra-info'} className="sb-submenu-item">
                            {/* Info / Document icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 2h9l5 5v15H6V2z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M9 12h6M9 16h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Add Other Info
                        </Link>
                        </li>
                    </ul>
                </div>
            </li>

                <li>
                        <div className="sb-parent">
                            <button 
                                className="sb-dropdown" 
                                onClick={() => setViewDocument(!isViewDocument)}
                                aria-expanded={isViewDocument}
                            >
                                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>View Documents</span>
                                <svg className={`sb-arrow ${isViewDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <ul className={`sb-submenu ${isViewDocument ? 'sb-submenu-open' : ''}`}>
                                <li>
                                    <Link to={'/client/view-docs'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        View ID Proofs
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/client/view-bank-info'} className="sb-submenu-item">
                                        {/* Bank icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 10h18L12 3 3 10z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M4 10v10h16V10" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M8 14h8M8 18h8" stroke="#6B7280" strokeWidth="1.5"/>
                                        </svg>
                                        View Bank Info
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/client/view-personal-info'} className="sb-submenu-item">
                                        {/* User / Profile icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="7" r="4" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M5.5 21c0-3.6 3-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        View Personal Info
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/client/view-extra-info'} className="sb-submenu-item">
                                        {/* File / Document icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 2h9l5 5v15H6V2z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
                                        <path d="M9 12h6M9 16h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        View Other Info
                                    </Link>
                                </li>

                            </ul>
                        </div>
                </li>     
        </>
       )
    }


    if(role == 'employee'){
       EmployeePanel = (
        <>
            <li>
                <div className="sb-parent">
                    <button 
                        className="sb-dropdown" 
                        onClick={() => setAddDocument(!isAddDocument)}
                        aria-expanded={isAddDocument}
                    >
                        <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Add Documents</span>
                        <svg className={`sb-arrow ${isAddDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <ul className={`sb-submenu ${isAddDocument ? 'sb-submenu-open' : ''}`}>
                        <li>
                        <Link to={'/client/upload-documents'} className="sb-submenu-item">
                            {/* ID card icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 5h18v14H3V5z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 9h4M7 13h2M15 13h2M11 17h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Upload ID proofs
                        </Link>
                        </li>

                        <li>
                            <Link to={'/client/add-bank-info'} className="sb-submenu-item">
                                {/* Bank icon */}
                                <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M3 10h18L12 3 3 10z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M4 10v10h16V10" stroke="#6B7280" strokeWidth="1.5"/>
                                <path d="M9 14h6" stroke="#6B7280" strokeWidth="1.5"/>
                                </svg>
                                Add Bank Info
                            </Link>
                        </li>

                        <li>
                        <Link to={'/client/add-personal-info'} className="sb-submenu-item">
                            {/* User / Profile icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="7" r="4" stroke="#6B7280" strokeWidth="1.5"/>
                            <path d="M5.5 21c0-3.6 3-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Add Personal Info
                        </Link>
                        </li>

                        <li>
                        <Link to={'/client/add-extra-info'} className="sb-submenu-item">
                            {/* Info / Document icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 2h9l5 5v15H6V2z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M9 12h6M9 16h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Add Other Info
                        </Link>
                        </li>
                    </ul>
                </div>
            </li>

                <li>
                        <div className="sb-parent">
                            <button 
                                className="sb-dropdown" 
                                onClick={() => setViewDocument(!isViewDocument)}
                                aria-expanded={isViewDocument}
                            >
                                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Associated Users</span>
                                <svg className={`sb-arrow ${isViewDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <ul className={`sb-submenu ${isViewDocument ? 'sb-submenu-open' : ''}`}>
                                <li>
                                    <Link to={'/employee/user-list'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       View Users
                                    </Link>
                                </li>

                            </ul>
                        </div>
                </li>     
        </>
       )
    }

    
    if(role == 'admin'){
       AdminPanel = (
        <>
            <li>
                <div className="sb-parent">
                    <button 
                        className="sb-dropdown" 
                        onClick={() => setAddDocument(!isAddDocument)}
                        aria-expanded={isAddDocument}
                    >
                        <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Add Documents</span>
                        <svg className={`sb-arrow ${isAddDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <ul className={`sb-submenu ${isAddDocument ? 'sb-submenu-open' : ''}`}>
                        <li>
                        <Link to={'/client/upload-documents'} className="sb-submenu-item">
                            {/* ID card icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 5h18v14H3V5z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 9h4M7 13h2M15 13h2M11 17h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Upload ID proofs
                        </Link>
                        </li>

                        <li>
                            <Link to={'/client/add-bank-info'} className="sb-submenu-item">
                                {/* Bank icon */}
                                <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M3 10h18L12 3 3 10z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M4 10v10h16V10" stroke="#6B7280" strokeWidth="1.5"/>
                                <path d="M9 14h6" stroke="#6B7280" strokeWidth="1.5"/>
                                </svg>
                                Add Bank Info
                            </Link>
                        </li>

                        <li>
                        <Link to={'/client/add-personal-info'} className="sb-submenu-item">
                            {/* User / Profile icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="7" r="4" stroke="#6B7280" strokeWidth="1.5"/>
                            <path d="M5.5 21c0-3.6 3-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Add Personal Info
                        </Link>
                        </li>

                        <li>
                        <Link to={'/client/add-extra-info'} className="sb-submenu-item">
                            {/* Info / Document icon */}
                            <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 2h9l5 5v15H6V2z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M9 12h6M9 16h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Add Other Info
                        </Link>
                        </li>
                    </ul>
                </div>
            </li>

            <li>
                <div className="sb-parent">
                            <button 
                                className="sb-dropdown" 
                                onClick={() => setViewDocument(!isViewDocument)}
                                aria-expanded={isViewDocument}
                            >
                                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Associated Users</span>
                                <svg className={`sb-arrow ${isViewDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <ul className={`sb-submenu ${isViewDocument ? 'sb-submenu-open' : ''}`}>
                                <li>
                                    <Link to={'/admin/user-list'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       View Users
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/admin/add-employee'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Add Employee
                                    </Link>
                                </li>

                                 <li>
                                    <Link to={'/admin/view-employee'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       View Employee
                                    </Link>
                                </li>
                                 <li>
                                    <Link to={'/admin/employee-users'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Employee User
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/admin/consumer-status'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Consumer Status
                                    </Link>
                                </li>

                                 <li>
                                    <Link to={'/admin/consumer-status'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Consumer Status
                                    </Link>
                                </li>

                            </ul>
                </div>
            </li>    

            <li>
                <div className="sb-parent">
                            <button 
                                className="sb-dropdown" 
                                onClick={() => setViewDocument(!isViewDocument)}
                                aria-expanded={isViewDocument}
                            >
                                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Associated Users</span>
                                <svg className={`sb-arrow ${isViewDocument ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <ul className={`sb-submenu ${isViewDocument ? 'sb-submenu-open' : ''}`}>
                                <li>
                                    <Link to={'/admin/user-list'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       View Users
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/admin/add-employee'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Add Employee
                                    </Link>
                                </li>

                                 <li>
                                    <Link to={'/admin/view-employee'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       View Employee
                                    </Link>
                                </li>
                                 <li>
                                    <Link to={'/admin/employee-users'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Employee User
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/admin/consumer-status'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Consumer Status
                                    </Link>
                                </li>

                                 <li>
                                    <Link to={'/admin/consumer-status'} className="sb-submenu-item">
                                        {/* ID card icon */}
                                        <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.5"/>
                                        <path d="M13 11h5M13 15h4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                       Consumer Status
                                    </Link>
                                </li>

                            </ul>
                </div>
            </li>    
        </>
       )
    }


  return (      
    <> 
        {role == 'user' && UserPanel}
        {role == 'employee' && EmployeePanel}
        {role == 'admin' && AdminPanel}
    </>
  )
}

export default ListItems;