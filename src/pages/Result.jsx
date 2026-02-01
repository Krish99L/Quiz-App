import { useLocation, Link } from "react-router-dom";

function Result() {
    const location = useLocation();
    const { score, total } = location.state || { score: 0, total: 0 };

    const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0;

    return (
        <div>
            <h1>Quiz Completed</h1>
            <h2>Score: {score} / {total}</h2>
            <h3>Percentage: {percentage}%</h3>

            <Link to="/">
                <button>Go Home</button>
            </Link>

            <Link to="/history">
                <button>View History</button>
            </Link>
        </div>
    );
}

export default Result;
                        