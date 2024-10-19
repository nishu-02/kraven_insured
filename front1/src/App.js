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
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import Dashboard from './components/Dashboard';
import icon1 from './components/icon1.png';
import icon2 from './components/icon2.png';
import icon3 from './components/icon3.png';

// Import Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDxWTmBsslJZ80e7mEbDBtCi7FNlrMSuJE",
    authDomain: "ecanteen-4ab1b.firebaseapp.com",
    projectId: "ecanteen-4ab1b",
    storageBucket: "ecanteen-4ab1b.appspot.com",
    messagingSenderId: "65494167458",
    appId: "1:65494167458:web:d3cdfbbafce02a6c5b8cfb",
    measurementId: "P52Q86NJ83"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
    const [user, setUser] = useState(null);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                navigate('/connect-wallet');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            console.error("Authentication error:", error.message);
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsWalletConnected(false);
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    const handleWalletConnect = () => {
        setIsWalletConnected(true);
        navigate('/dashboard');
    };

    return (
        <div className="App">
            <Routes>
                {/* Login/Signup Route */}
                <Route
                    path="/"
                    element={
                        !user ? (
                            <header className="App-header">
                                <h1 className="kraVen-title">kraVen</h1>
                                <div className='background-img'></div>
                                <div className="login-container">
                                    <form onSubmit={handleAuthSubmit} className="login-form">
                                        <input 
                                            type="email" 
                                            placeholder="Email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                        <button type="submit" className="login-button">
                                            {isSignUp ? 'Sign Up' : 'Login'}
                                        </button>
                                    </form>
                                    <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-auth-mode">
                                        {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
                                    </button>
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
                        user ? (
                            <header className="App-header">
                                <h1 className="kraVen-title">kraVen</h1>
                                <div className='background-img'></div>
                                <ConnectWallet onMetaMaskConnect={handleWalletConnect} />
                                <button onClick={handleLogout} className="logout-button">Logout</button>
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
                            <Dashboard onLogout={handleLogout} />
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