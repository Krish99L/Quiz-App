import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Register</h2>

                <input
                    type="email"
                    placeholder="Email"
                    style={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.primaryBtn} onClick={handleRegister}>
                    Create Account
                </button>

                <p style={styles.switchText}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6"
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },
    title: {
        textAlign: "center",
        marginBottom: "10px"
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "14px"
    },
    primaryBtn: {
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "#fff",
        fontWeight: "500",
        cursor: "pointer"
    },
    switchText: {
        textAlign: "center",
        fontSize: "14px"
    },
    link: {
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: "500"
    }
};