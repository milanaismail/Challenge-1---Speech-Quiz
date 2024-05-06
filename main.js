let questionIndex = 0;
let questions = [
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: "What is the chemical symbol for water?", answer: "h2o" } 
];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const speakBtn = document.querySelector('#startButton');
const resultDiv = document.querySelector("#result"); // Define resultDiv

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase(); // Trim and lowercase the answer
    console.log(transcript);
    resultDiv.innerHTML += transcript + "<br>";
    checkAnswer(transcript); // Check the answer when speech is recognized
    speakBtn.disabled = false;
}
  
speakBtn.addEventListener("click", function () {
    recognition.start();
    speakBtn.disabled = true;
});

function startQuiz() {
    showQuestion(questions[questionIndex]);
}

function showQuestion(questionObj) {
    document.getElementById('question').innerHTML = questionObj.question;
}

function checkAnswer(answer) {
    const currentQuestion = questions[questionIndex];
    if (answer === currentQuestion.answer) {
        resultDiv.textContent = 'Correct!';
        document.body.style.backgroundColor = 'green';
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            resultDiv.textContent = 'Quiz Finished!';
        }
    } else {
        resultDiv.textContent = 'Incorrect! Try again.';
        document.body.style.backgroundColor = 'red';

    }   
}

startQuiz();