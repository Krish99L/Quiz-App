import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    // Fetch questions when component loads
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    "https://opentdb.com/api.php?amount=10&type=multiple"
                );
                setQuestions(response.data.results);
            } catch (error) {
                console.error("Error fetching questions:", error.message);
            }
        };

        fetchQuestions();
    }, []);

    // Show loading until questions arrive
    if (questions.length === 0) {
        return <h2>Loading questions...</h2>;
    }

    const currentQuestion = questions[currentIndex];

    // Combine correct + incorrect answers and shuffle
    const options = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);

    const handleAnswer = (selectedOption) => {
        const updatedScore =
            selectedOption === currentQuestion.correct_answer
                ? score + 1
                : score;

        setScore(updatedScore);

        const nextQuestion = currentIndex + 1;

        if (nextQuestion < questions.length) {
            setCurrentIndex(nextQuestion);
        } else {
            // Save attempt to LocalStorage
            const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

            const newAttempt = {
                date: new Date().toLocaleString(),
                score: updatedScore,
                total: questions.length,
            };

            localStorage.setItem("quizHistory", JSON.stringify([...history, newAttempt]));

            // Navigate to result page
            navigate("/result", {
                state: { score: updatedScore, total: questions.length },
            });
        }
    };

    return (
        <div className="quiz-container">
            <h2>
                Question {currentIndex + 1} of {questions.length}
            </h2>

            <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

            {options.map((option, index) => (
                <div key={index}>
                    <button
                        onClick={() => handleAnswer(option)}
                        dangerouslySetInnerHTML={{ __html: option }}
                    />
                </div>
            ))}
        </div>
    );
}

export default Quiz;
