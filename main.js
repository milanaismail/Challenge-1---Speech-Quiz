let questionIndex = 0;
let questions = [
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: "What is the chemical symbol for water?", answer: "h2o" },
    { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    { question: "Who painted the Mona Lisa?", answer: "leonardo da vinci" },
    { question: "What is the tallest mountain in the world?", answer: "mount everest" },
    { question: "What is the largest continent in the world?", answer: "asia" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "william shakespeare" },
];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const speakBtn = document.querySelector('#startButton');
const resultDiv = document.querySelector("#result"); 
const nextBtn = document.querySelector('#nextBtn');

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase(); 
    console.log(transcript);
    resultDiv.innerHTML += transcript + "<br>";
    checkAnswer(transcript);
    speakBtn.disabled = false;
}

  
speakBtn.addEventListener("click", function () {
    recognition.start();
    speakBtn.disabled = true;
});

function showQuestion(questionObj) {
    document.getElementById('question').innerHTML = questionObj.question;
    speakQuestion(questionObj.question); // Call speakQuestion to read out the question
}

function startQuiz() {
    showQuestion(questions[questionIndex]);
}


function speakQuestion(question) {
    console.log("Speaking question:", question); // Log the question being spoken
    const speech = new SpeechSynthesisUtterance(question);
    speech.onstart = function(event) {
        console.log("Speech Synthesis Started");
    }
    speech.onend = function(event) {
        console.log("Speech Synthesis Ended");
    }
    window.speechSynthesis.speak(speech);
}

function checkAnswer(answer) {
    const currentQuestion = questions[questionIndex];
    if (answer === currentQuestion.answer) {
        resultDiv.textContent = 'Correct! The answer was: ' + currentQuestion.answer;
        document.body.style.backgroundColor = 'green';
        speakBtn.style.display = 'none'; 
        questionIndex++;
        if (questionIndex < questions.length) {
            setTimeout(function() {
                showQuestion(questions[questionIndex]);
                document.body.style.backgroundColor = ''; 
                speakBtn.style.display = 'inline-block'; 
                resultDiv.textContent = '';
                nextBtn.style.display = 'none'; 
            }, 2000);
        } else {
            resultDiv.textContent = 'Quiz Finished!';
        }
    } else {
        resultDiv.textContent = 'Incorrect! The correct answer was: ' + currentQuestion.answer;
        const userAnswerText = document.createElement('p'); 
        userAnswerText.textContent = 'Your answer was: ' + answer;
        resultDiv.appendChild(userAnswerText); 
        document.body.style.backgroundColor = 'red';
        speakBtn.style.display = 'none'; 
        nextBtn.style.display = 'inline-block';
        nextBtn.addEventListener('click', function() {
            document.body.style.backgroundColor = '';
            resultDiv.textContent = '';
            questionIndex++;
            if (questionIndex < questions.length) {
                showQuestion(questions[questionIndex]);
                speakBtn.style.display = 'inline-block'; 
                nextBtn.style.display = 'none';
            } else {
                resultDiv.textContent = 'Quiz Finished!';
            }
        });
        resultDiv.appendChild(nextBtn);
    }   
}

startQuiz();