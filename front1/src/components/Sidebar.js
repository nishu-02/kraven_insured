import React from 'react';
import './Sidebar.css'; // Import your styles for the sidebar
import { SidebarData } from './SidebarData'; // Import your data for the sidebar

function Sidebar() {
    return (
        <div className="Sidebar">
            <ul>
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key} onClick={() => { window.location.pathname = val.link }}>
                            <div> {val.icon} </div>
                            <div> {val.title} </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
