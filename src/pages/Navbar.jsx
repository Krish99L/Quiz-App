import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setShowDropdown(false);
    };

    return (
        <nav style={styles.navbar}>
            {/* LEFT SIDE */}
            <div style={styles.left}>
                <h2 style={styles.logo}>QuizMaster</h2>

                <ul style={styles.navLinks}>
                    <li>
                        <Link to="/" style={styles.link}>
                            Quiz
                        </Link>
                    </li>
                    <li>
                        <Link to="/history" style={styles.link}>
                            History
                        </Link>
                    </li>
                </ul>
            </div>

            {/* RIGHT SIDE */}
            <div style={styles.right}>
                {user ? (
                    <div style={styles.profileWrapper}>
                        <div
                            onClick={() => setShowDropdown(!showDropdown)}
                            style={{ cursor: "pointer" }}
                        >
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="profile"
                                    style={styles.profilePic}
                                />
                            ) : (
                                <FaUserCircle size={32} color="#333" />
                            )}
                        </div>

                        {showDropdown && (
                            <div style={styles.dropdown}>
                                <p style={styles.dropdownItem}>
                                    {user.displayName || user.email}
                                </p>
                                <button style={styles.logoutBtn} onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={styles.authLinks}>
                        <Link to="/login" style={styles.authBtn}>
                            Login
                        </Link>
                        <Link to="/register" style={styles.authBtn}>
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
    },

    left: {
        display: "flex",
        alignItems: "center",
        gap: "30px",
    },

    logo: {
        margin: 0,
        fontSize: "22px",
        fontWeight: "bold",
    },

    navLinks: {
        display: "flex",
        listStyle: "none",
        gap: "20px",
        margin: 0,
        padding: 0,
    },

    link: {
        textDecoration: "none",
        color: "#333",
        fontWeight: "500",
    },

    right: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },

    profileWrapper: {
        position: "relative",
    },

    profilePic: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        objectFit: "cover",
    },

    dropdown: {
        position: "absolute",
        top: "45px",
        right: 0,
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        overflow: "hidden",
        minWidth: "160px",
        textAlign: "center",
        zIndex: 100,
    },

    dropdownItem: {
        padding: "10px",
        borderBottom: "1px solid #eee",
    },

    logoutBtn: {
        width: "100%",
        padding: "10px",
        border: "none",
        backgroundColor: "#ef4444",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "500",
    },

    authLinks: {
        display: "flex",
        gap: "10px",
    },

    authBtn: {
        padding: "6px 12px",
        borderRadius: "4px",
        backgroundColor: "#2563eb",
        color: "#fff",
        textDecoration: "none",
        fontSize: "14px",
    },
};