// Dashboard.js
// jsx


import React, { useState } from 'react';
import './Dashboard.css';


import Sidebar from './Sidebar'


function Dashboard() {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleCard = (index) => {
        if (expandedCard === index) {
            setExpandedCard(null);
        } else {
            setExpandedCard(index);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prevState) => !prevState);
    };

    const warranties = [
        { title: "Warranty 1", product: "ABC", validTill: "Dec 2025" },
        { title: "Warranty 2", product: "XYZ", validTill: "Jan 2024" },
        { title: "Warranty 3", product: "DEF", validTill: "May 2026" },
        
        { title: "Warranty 4", product: "DEF", validTill: "May 2026" },
    ];

    return (
        <div className="dashboard-wrapper">
           {/* <aside> */}
            <Sidebar>

            </Sidebar>
            {/* </aside> */}
            
            <div className="dashboard-content">
                <div className='Headingg'>
                    <p>Dashboard</p>
                </div>
                <br></br>
                <br></br>
                <div className="warranty-cards">
                    {warranties.map((warranty, index) => (
                        <div
                            key={index}
                            className={`card ${expandedCard === index ? 'expanded' : ''}`}
                            onClick={() => toggleCard(index)}
                        >
                            <h3>{warranty.title}</h3>
                            <div className="card-content">
                                <p>Product: {warranty.product}</p>
                                <p>Valid Till: {warranty.validTill}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
    );
}

export default Dashboard;
