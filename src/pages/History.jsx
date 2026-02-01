import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HistoryStyle.css";

function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("quizHistory")) || [];
        setHistory(stored);
    }, []);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear all history?")) {
            localStorage.removeItem("quizHistory");
            setHistory([]);
        }
    };

    return (
        <div className="history-container">
            <div className="history-card">
                <div className="history-header">
                    <h1>Quiz History</h1>
                    <div className="header-buttons">
                        <Link to="/" className="back-link">Back</Link>
                        <button className="clear-btn" onClick={clearHistory}>Clear</button>
                    </div>
                </div>

                {history.length === 0 ? (
                    <div className="no-data">
                        <p>No attempts yet. Go take a quiz!</p>
                        <Link to="/quiz" className="start-link">Start Now</Link>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.map((attempt, index) => (
                            <div key={index} className="history-item">
                                <div className="attempt-info">
                                    <span className="attempt-date">{attempt.date}</span>
                                    <span className="attempt-score">
                                        Score: <strong>{attempt.score} / {attempt.total}</strong>
                                    </span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${(attempt.score / attempt.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;