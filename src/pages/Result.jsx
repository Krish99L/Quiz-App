import { useLocation, Link } from "react-router-dom";

function Result() {
    const location = useLocation();
    const { score, total } = location.state || { score: 0, total: 0 };

    const percentage = ((score / total) * 100).toFixed(2);


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
            <Link to="/quiz">
            <button>
                Play Again
            </button>
            </Link>

        </div>
    );
}

export default Result;
