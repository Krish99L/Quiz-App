import { useLocation, Link } from "react-router-dom";
import "./ResultStyle.css"; // Import the new CSS

function Result() {
    const location = useLocation();
    const { score, total } = location.state || { score: 0, total: 0 };
    const percentage = ((score / total) * 100).toFixed(0);

    return (
        <div className="result-container">
            <div className="result-card">
                <div className="icon-box">🏆</div>
                <h1>Quiz Completed</h1>

                <div className="score-display">
                    <div className="score-circle">
                        <span className="percent">{percentage}%</span>
                        <span className="label">Score</span>
                    </div>
                    <h2>{score} / {total} Correct</h2>
                </div>

                <div className="result-actions">
                    <Link to="/quiz">
                        <button className="play-again-btn">Play Again</button>
                    </Link>

                    <div className="secondary-actions">
                        <Link to="/">
                            <button className="outline-btn">Go Home</button>
                        </Link>
                        <Link to="/history">
                            <button className="outline-btn">History</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;