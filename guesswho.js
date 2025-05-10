let players = [];
let answers = [];
let currentPlayer = 0;
let guesses = {};
let scores = {};
let shuffledAnswers = [];
let shuffledAnswersForCurrentPlayer = [];

const questions = [
    "If you could be any fictional character, who would you be?",
    "What's your dream job?",
    "What's your biggest fear?",
    "What's your guilty pleasure?",
    "If you had a superpower, what would it be?",
    "Name a place you dream to visit.",
    "If you were an animal, which one would you be?",
    "What is your favorite movie?",
    "If you could time travel, where would you go?",
    "What's your secret talent?"
];

let currentQuestion = "";

function addPlayerInput() {
    const playerInputs = document.getElementById('playerInputs');
    const playerList = document.querySelectorAll('.playerName'); // renamed to avoid shadowing

    if (playerList.length >= 10) {
        alert('Maximum 10 players allowed.');
        return;
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'playerName';
    input.placeholder = `Player ${playerList.length + 1} Name`; // fixed with template literal
    playerInputs.appendChild(input);
    playerInputs.appendChild(document.createElement('br'));
}

function startGame() {
    players = Array.from(document.querySelectorAll('.playerName'))
        .map(input => input.value.trim())
        .filter(name => name !== '');

    if (players.length < 2) {
        alert('Enter at least 2 players!');
        return;
    }

    if (Object.keys(scores).length === 0) {
        players.forEach(player => scores[player] = 0);
    }

    document.getElementById('playerForm').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    startNewRound();
}

function startNewRound() {
    answers = [];
    guesses = {};
    currentPlayer = 0;
    shuffledAnswers = [];

    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById('questionText').innerText = currentQuestion;

    askQuestion();
}

function askQuestion() {
    document.getElementById('answer').value = '';
    document.getElementById('questionHeader').innerText = `Answering: ${players[currentPlayer]}`; // fixed
}

function submitAnswer() {
    const answerText = document.getElementById('answer').value.trim();
    if (answerText === '') {
        alert('Please write an answer!');
        return;
    }

    answers.push({ player: players[currentPlayer], answer: answerText });

    currentPlayer++;

    if (currentPlayer < players.length) {
        askQuestion();
    } else {
        startGuessingPhase();
    }
}

function startGuessingPhase() {
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('guessingScreen').style.display = 'block';

    shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    guesses = {};
    currentPlayer = 0;
    showGuessing();
}

function showGuessing() {
    const guessArea = document.getElementById('guessArea');
    guessArea.innerHTML = '';

    const current = players[currentPlayer];
    guessArea.innerHTML = `<h3>${current}, guess who wrote each answer:</h3>`; // fixed

    const filteredAnswers = shuffledAnswers.filter(item => item.player !== current);

    filteredAnswers.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>"${item.answer}"</p>
            <select id="guess-${index}">
                <option value="">-- Guess who --</option>
                ${players.filter(p => p !== current).map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
        `;
        guessArea.appendChild(div);
    });

    shuffledAnswersForCurrentPlayer = filteredAnswers;
}

function submitGuess() {
    const playerGuesses = [];

    for (let i = 0; i < shuffledAnswersForCurrentPlayer.length; i++) {
        const guess = document.getElementById(`guess-${i}`).value;
        if (guess === '') {
            alert('Please guess for all answers!');
            return;
        }
        playerGuesses.push(guess);
    }

    // Save both guesses and the matching answers
    guesses[players[currentPlayer]] = {
        guesses: playerGuesses,
        answers: [...shuffledAnswersForCurrentPlayer]
    };

    currentPlayer++;

    if (currentPlayer < players.length) {
        showGuessing();
    } else {
        goToDiscussion();
    }
}

function goToDiscussion() {
    document.getElementById('guessingScreen').style.display = 'none';
    document.getElementById('ten-countdown').style.display = 'block';

    document.getElementById('ten-countdown').innerHTML = `
        <h1>It’s time for discussion!</h1>
        <h2>Discuss your answers with your friends.</h2>
    `;

    const discussionButton = document.createElement('button');
    discussionButton.textContent = 'Go to Scores';
    discussionButton.onclick = () => {
        document.getElementById('ten-countdown').style.display = 'none';
        calculateScores();
    };

    document.getElementById('ten-countdown').appendChild(discussionButton);
}

function calculateScores() {
    document.getElementById('scoreScreen').style.display = 'block';

    for (const [playerName, { guesses: playerGuesses, answers: answerList }] of Object.entries(guesses)) {
        playerGuesses.forEach((guess, idx) => {
            const realPlayer = answerList[idx].player;
            if (guess === realPlayer) {
                scores[playerName]++;
            }
        });
    }

    displayScores();
}


function displayScores() {
    const scoreArea = document.getElementById('scoreArea');
    scoreArea.innerHTML = '';

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    sortedScores.forEach(([player, score]) => {
        const p = document.createElement('p');
        p.innerText = `${player}: ${score} points`;
        scoreArea.appendChild(p);

        const guessesList = document.createElement('ul');
        const { guesses: playerGuesses, answers: answerList } = guesses[player];

        playerGuesses.forEach((guess, idx) => {
            const realPlayer = answerList[idx].player;
            const li = document.createElement('li');
            if (guess === realPlayer) {
                li.innerText = `✅ "${answerList[idx].answer}" was correctly guessed as ${realPlayer}`;
                li.style.color = 'white';
            } else {
                li.innerText = `❌ "${answerList[idx].answer}" was by ${realPlayer}, you guessed ${guess}`;
                li.style.color = 'white';
            }
            guessesList.appendChild(li);
        });

        scoreArea.appendChild(guessesList);
    });
}


function nextRound() {
    document.getElementById('scoreScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    startNewRound();
}

function restartGame() {
    players = [];
    answers = [];
    guesses = {};
    scores = {};
    shuffledAnswers = [];
    currentPlayer = 0;

    document.getElementById('playerForm').style.display = 'block';
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('guessingScreen').style.display = 'none';
    document.getElementById('scoreScreen').style.display = 'none';
    document.getElementById('ten-countdown').style.display = 'none';

    document.getElementById('playerInputs').innerHTML = `
        <input type="text" class="playerName" placeholder="Player 1 Name"><br>
        <input type="text" class="playerName" placeholder="Player 2 Name"><br>
    `;
}

