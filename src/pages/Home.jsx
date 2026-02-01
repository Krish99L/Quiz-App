import { Link } from "react-router-dom";
import "./HomeStyle.css"; // Ensure you create this file with the CSS below

function Home() {
    return (
        <div className="home-container">
            <div className="hero-card">
                <img src="/image.png" alt="Quiz App Logo" className="hero-image" />
                <h1>Quiz App</h1>
                <p>Test your knowledge with 10 multiple choice questions.</p>

                <div className="home-actions">
                    <Link to="/quiz">
                        <button className="start-btn">Start Quiz</button>
                    </Link>

                    <Link to="/history">
                        <button className="history-btn">View History</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;