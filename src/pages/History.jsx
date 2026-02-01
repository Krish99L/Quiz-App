import { useEffect, useState } from "react";

function History() {
    const [history, setHistory] = useState([]);
// Load history from LocalStorage on component mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("quizHistory")) || [];
        setHistory(stored);
    }, []);
// Function to clear history
    const clearHistory = () => {
        localStorage.removeItem("quizHistory");
        setHistory([]);
    };


    return (
        <div>
            <h2>Quiz History</h2>
            <button onClick={clearHistory}>Clear History</button>
            {history.length === 0 ? (
                <p>No attempts yet.</p>
            ) : (
                history.map((attempt, index) => (
                    <div key={index}>
                        <p>Date: {attempt.date}</p>
                        <p>Score: {attempt.score} / {attempt.total}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default History;
