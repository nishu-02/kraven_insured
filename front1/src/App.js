// // // App.js
// // import React, { useState } from 'react';
// // import './App.css';
// // import ConnectWallet from './components/ConnectWallet';
// // import icon1 from './components/icon1.png';
// // import icon2 from './components/icon2.png';
// // import icon3 from './components/icon3.png';

// // function App() {
// //     const [isLoggedIn, setIsLoggedIn] = useState(false);
// //     const [isWalletConnected, setIsWalletConnected] = useState(false);

// //     const handleLoginSubmit = (e) => {
// //         e.preventDefault();
// //         setIsLoggedIn(true);
// //     };

// //     const onMetaMaskConnect = () => {
// //         setIsWalletConnected(true);
// //         // You can also perform other actions here, like updating state, fetching user info, etc.
// //     };

// //     return (
// //         <div className="App">
// //             <header className="App-header">
// //                 <h1 className="kraVen-title">kraVen</h1>
// //                 <div className='background-img'></div>
// //                 {!isLoggedIn ? (
// //                     <div className="login-container">
// //                         <form onSubmit={handleLoginSubmit} className="login-form">
// //                             <input type="text" placeholder="Username" required />
// //                             <input type="password" placeholder="Password" required />
// //                             <button type="submit" className="login-button">Login</button>
// //                         </form>
// //                     </div>
// //                 ) : (
// //                     <ConnectWallet onMetaMaskConnect={onMetaMaskConnect} />
// //                 )}
// //                 {/* Floating Icons */}
// //                 <div className="floating-icons">
// //                     <img src={icon1} alt="icon1" className="floating-icon" />
// //                     <img src={icon2} alt="icon2" className="floating-icon" />
// //                     <img src={icon3} alt="icon3" className="floating-icon" />
// //                 </div>
// //             </header>
// //         </div>
// //     );
// // }

// // export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import Dashboard from './components/Dashboard';
import icon1 from './components/icon1.png';
import icon2 from './components/icon2.png';
import icon3 from './components/icon3.png';




function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // For login state
    const [isWalletConnected, setIsWalletConnected] = useState(false);  // For MetaMask connection state
    const navigate = useNavigate();  // To handle navigation programmatically

    // Handle login submit
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);  // Login successful, update state
        navigate('/connect-wallet');  // Redirect to connect wallet page
    };

    // Handle MetaMask connection success
    const handleWalletConnect = () => {
        setIsWalletConnected(true);  // MetaMask connected
        navigate('/dashboard');  // Redirect to the dashboard after MetaMask is connected
    };

    return (
        <div className="App">
            <Routes>
                {/* Login Route */}
                <Route
                    path="/"
                    element={
                        !isLoggedIn ? (
                            <header className="App-header">
                                <h1 className="kraVen-title">kraVen</h1>
                                <div className='background-img'></div>
                                <div className="login-container">
                                    <form onSubmit={handleLoginSubmit} className="login-form">
                                        <input type="text" placeholder="Username" required />
                                        <input type="password" placeholder="Password" required />
                                        <button type="submit" className="login-button">Login</button>
                                    </form>
                                </div>
                                <div className="floating-icons">
                                    <img src={icon1} alt="icon1" className="floating-icon" />
                                    <img src={icon2} alt="icon2" className="floating-icon" />
                                    <img src={icon3} alt="icon3" className="floating-icon" />
                                </div>
                            </header>
                        ) : (
                            <Navigate to="/connect-wallet" />
                        )
                    }
                />

                {/* Connect Wallet Route */}
                <Route
                    path="/connect-wallet"
                    element={
                        isLoggedIn ? (
                            <header className="App-header">
                                <h1 className="kraVen-title">kraVen</h1>
                                <div className='background-img'></div>
                                <ConnectWallet onMetaMaskConnect={handleWalletConnect} />
                                <div className="floating-icons">
                                    <img src={icon1} alt="icon1" className="floating-icon" />
                                    <img src={icon2} alt="icon2" className="floating-icon" />
                                    <img src={icon3} alt="icon3" className="floating-icon" />
                                </div>
                            </header>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                {/* Dashboard Route */}
                <Route
                    path="/dashboard"
                    element={
                        isWalletConnected ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/connect-wallet" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;