import React, { useState } from 'react';
import './Sidebar.css';
import SidebarItems from '../SidebarItems/SidebarItems';


const SidebarNew = ({ isOpen }) => {

  
  return (
    <div className={`sb-sidebar ${isOpen ? 'sb-open' : ''}`}>
      <div className="sb-sidebar-header">
        <div className="sb-logo-container">
          <div className="sb-logo">M</div>
          <span className="sb-app-name">MyApp</span>
        </div>
      </div>

      <SidebarItems />

      
      <div className="sb-sidebar-footer">
        <div className="sb-user-profile">
          <div className="sb-user-avatar">MHC</div>
          <div className="sb-user-info">
    
            <div className="sb-user-role">Welcome</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNew;