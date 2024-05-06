let questionIndex = 0;
let questions = [
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: "What is the chemical symbol for water?", answer: "h2o" },
    { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "william shakespeare" },
    { question: "Who painter the Mona Lisa?", answer: "leonardo da vinci" },
    { question: "What is the tallest mountain in the world?", answer: "mount everest" },
    { question: "What is the largest continent in the world?", answer: "asia" },



];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const speakBtn = document.querySelector('#startButton');
const resultDiv = document.querySelector("#result"); // Define resultDiv
const nextBtn = document.querySelector('#nextBtn');

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
        resultDiv.textContent = 'Correct! The answer was: ' + currentQuestion.answer;
        document.body.style.backgroundColor = 'green';
        questionIndex++;
        if (questionIndex < questions.length) {
            setTimeout(function() {
                showQuestion(questions[questionIndex]);
                document.body.style.backgroundColor = ''; // Reset background color to white
                speakBtn.style.display = 'inline-block'; // Make Answer button visible again
                resultDiv.textContent = '';
                nextBtn.style.display = 'none'; // Hide Next button
            }, 2000); // Delay for 2 seconds before showing next question and resetting background color
        } else {
            resultDiv.textContent = 'Quiz Finished!';
        }
    } else {
        resultDiv.textContent = 'Incorrect! The correct answer was: ' + currentQuestion.answer;
        document.body.style.backgroundColor = 'red';
        speakBtn.style.display = 'none'; 
        nextBtn.style.display = 'inline-block';
        nextBtn.addEventListener('click', function() {
            document.body.style.backgroundColor = '';
            resultDiv.textContent = '';
            questionIndex++;
            if (questionIndex < questions.length) {
                showQuestion(questions[questionIndex]);
                speakBtn.style.display = 'inline-block'; // Show speak button
                nextBtn.style.display = 'none';
            } else {
                resultDiv.textContent = 'Quiz Finished!';
            }
        });
        resultDiv.appendChild(nextBtn);
    }   
}


startQuiz();