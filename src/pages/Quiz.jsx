import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizStyle.css";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNext, setShowNext] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const navigate = useNavigate();

    // Fetch questions once
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

    // Shuffle options ONLY when question changes
    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentIndex];

            const shuffled = [
                ...currentQuestion.incorrect_answers,
                currentQuestion.correct_answer,
            ].sort(() => Math.random() - 0.5);

            setShuffledOptions(shuffled);
        }
    }, [currentIndex, questions]);

    if (questions.length === 0) {
        return <h2>Loading questions...</h2>;
    }

    const currentQuestion = questions[currentIndex];

    // Handle answer selection
    const handleAnswer = (option) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(option);
        setShowNext(true);

        if (option === currentQuestion.correct_answer) {
            setScore((prev) => prev + 1);
        }
    };

    // Handle next button
    const handleNext = () => {
        const nextQuestion = currentIndex + 1;

        if (nextQuestion < questions.length) {
            setCurrentIndex(nextQuestion);
            setSelectedAnswer(null);
            setShowNext(false);
        } else {
            const history =
                JSON.parse(localStorage.getItem("quizHistory")) || [];

            const newAttempt = {
                date: new Date().toLocaleString(),
                score: score,
                total: questions.length,
            };

            localStorage.setItem(
                "quizHistory",
                JSON.stringify([...history, newAttempt])
            );

            navigate("/result", {
                state: { score: score, total: questions.length },
            });
        }
    };

    return (
        <div className="quiz-container">
            <h2>
                Question {currentIndex + 1} of {questions.length}
            </h2>

            <p
                dangerouslySetInnerHTML={{
                    __html: currentQuestion.question,
                }}
            />

            {shuffledOptions.map((option, index) => {
                const isCorrect =
                    option === currentQuestion.correct_answer;
                const isSelected = option === selectedAnswer;

                let className = "";

                if (selectedAnswer) {
                    if (isCorrect) className = "correct";
                    else if (isSelected) className = "wrong";
                }

                return (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={selectedAnswer !== null}
                        className={className}
                        dangerouslySetInnerHTML={{ __html: option }}
                    />
                );
            })}

            {showNext && (
                <button className="next-btn" onClick={handleNext}>
                    Next Question
                </button>
            )}
        </div>
    );
}

export default Quiz;