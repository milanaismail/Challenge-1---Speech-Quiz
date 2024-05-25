let questionIndex = 0;
let questions = [
    { question: "What color do you get when you mix red with blue?", answer: "purple" },
    { question: "What is the chemical symbol for water?", answer: "h2o" },
    { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    { question: "In which year did world war 1 start?", answer: "1914" },
    { question: "Who painted the Mona Lisa?", answer: "leonardo da vinci" },
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: "What is the tallest mountain in the world?", answer: "mount everest" },
    { question: "What is the largest continent in the world?", answer: "asia" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "william shakespeare" },
    { question: "Who was the first president of America?", answer: "george washington" },
];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const startBtn = document.getElementById('startButton');
const speakBtn = document.querySelector('#answerBtn');
const resultDiv = document.querySelector("#result"); 
const nextBtn = document.querySelector('#nextBtn');
const timerDiv = document.getElementById('timer'); 

let correctAnswers = 0;
let totalQuestions = questions.length;
let recognition;
let timeLeft;
let timerInterval;

startBtn.addEventListener('click', function() {
    startQuiz();
    startBtn.style.display = 'none'; 
});

function showQuestion(questionObj) {
    document.getElementById('question').innerHTML = questionObj.question;
    speakQuestion(questionObj.question);
}

function startQuiz() {
    if (recognition) {
        recognition.abort(); 
        recognition.onresult = null; 
    }
    correctAnswers = 0;
    updateScore();
    
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    speakBtn.style.display = 'inline-block'; 

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.trim().toLowerCase(); 
        console.log(transcript);
        resultDiv.innerHTML += transcript + "<br>";
        checkAnswer(transcript);
    }

    showQuestion(questions[questionIndex]);
}

speakBtn.addEventListener("click", function () {
    recognition.start();
});

function speakQuestion(question) {
    console.log("Speaking question:", question); 
    const speech = new SpeechSynthesisUtterance(question);
    timerDiv.style.display = 'none';

    speech.onstart = function(event) {
        console.log("Speech Synthesis Started");
    }
    speech.onend = function(event) {
        console.log("Speech Synthesis Ended");
        timerDiv.style.display = 'block'; 
        startTimer(); 
    }
    window.speechSynthesis.speak(speech);
}

function checkAnswer(answer) {
    clearInterval(timerInterval); 
    const currentQuestion = questions[questionIndex];
    if (answer === currentQuestion.answer) {
        resultDiv.innerHTML = 'Correct! <br> The answer was: ' + currentQuestion.answer;
        document.body.style.backgroundColor = '#B5E486';
        speakBtn.style.display = 'none'; 
        correctAnswers++;
        questionIndex++;
        if (questionIndex < questions.length) {
            setTimeout(function() {
                showQuestion(questions[questionIndex]);
                document.body.style.backgroundColor = ''; 
                speakBtn.style.display = 'inline-block'; 
                resultDiv.textContent = '';
            }, 2000);
            updateScore();
        } else {
            resultDiv.textContent = 'Quiz Finished!';
        }
    } else {
        resultDiv.innerHTML = 'Incorrect! <br> The correct answer was: ' + currentQuestion.answer;
        const userAnswerText = document.createElement('p'); 
        userAnswerText.textContent = 'Your answer was: ' + answer;
        resultDiv.appendChild(userAnswerText); 
        document.body.style.backgroundColor = '#FFA2A2';
        speakBtn.style.display = 'none'; 
        nextBtn.style.display = 'inline-block';
        resultDiv.appendChild(nextBtn);
    }   
}

nextBtn.addEventListener('click', function() {
    document.body.style.backgroundColor = '';
    resultDiv.textContent = '';
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion(questions[questionIndex]);
        speakBtn.style.display = 'inline-block'; 
        nextBtn.style.display = 'none';
    } else {
        timerDiv.style.display = 'none'; 
        document.getElementById('question').innerHTML = 'Quiz Finished!';
    }
});

function updateScore() {
    document.getElementById('score').textContent = `Score: ${correctAnswers} out of ${totalQuestions} questions correct`;
}

function startTimer() {
    timeLeft = 5; 
    timerDiv.textContent = `${timeLeft}`;

    timerInterval = setInterval(function() {
        timeLeft--;
        timerDiv.textContent = `${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    resultDiv.innerHTML = 'Time\'s up! <br> The correct answer was: ' + questions[questionIndex].answer;
    document.body.style.backgroundColor = '#FFA2A2';
    speakBtn.style.display = 'none'; 
    nextBtn.style.display = 'inline-block';
    resultDiv.appendChild(nextBtn);
}
