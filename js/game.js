const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progress = document.getElementById("progress");
const timerText = document.getElementById("timer");
const notification = document.getElementById('notification');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let timer;
let timerInterval;

let questions = [
    {
        question: "¿En qué año se celebró el primer campeonato mundial de Fórmula 1?",
        choice1: "1950",
        choice2: "1960",
        choice3: "1970",
        choice4: "1980",
        answer: 1
    },
    {
        question: "¿Quién es el piloto con más campeonatos mundiales de Fórmula 1?",
        choice1: "Michael Schumacher",
        choice2: "Lewis Hamilton",
        choice3: "Ayrton Senna",
        choice4: "Juan Manuel Fangio",
        answer: 2
    },
    {
        question: "¿Cuál es la carrera de resistencia más famosa del mundo?",
        choice1: "Las 24 Horas de Le Mans",
        choice2: "El Gran Premio de Mónaco",
        choice3: "Las 500 Millas de Indianápolis",
        choice4: "El Rally Dakar",
        answer: 1
    },
    {
        question: "¿Qué fabricante de automóviles ha ganado más veces las 24 Horas de Le Mans?",
        choice1: "Ferrari",
        choice2: "Porsche",
        choice3: "Audi",
        choice4: "Toyota",
        answer: 2
    },
    {
        question: "¿En qué país se celebra el Gran Premio de Monza?",
        choice1: "España",
        choice2: "Francia",
        choice3: "Italia",
        choice4: "Alemania",
        answer: 3
    },
    {
        question: "¿Cuál es el nombre del circuito donde se celebra el Gran Premio de Mónaco?",
        choice1: "Circuit de Spa-Francorchamps",
        choice2: "Circuit de la Sarthe",
        choice3: "Circuit de Monaco",
        choice4: "Circuit Gilles Villeneuve",
        answer: 3
    },
    {
        question: "¿Cuál es el nombre del equipo de Fórmula 1 con sede en Maranello, Italia?",
        choice1: "Mercedes",
        choice2: "Red Bull Racing",
        choice3: "McLaren",
        choice4: "Ferrari",
        answer: 4
    },
    {
        question: "¿Qué piloto ganó el campeonato mundial de Fórmula 1 en 2016?",
        choice1: "Sebastian Vettel",
        choice2: "Nico Rosberg",
        choice3: "Lewis Hamilton",
        choice4: "Kimi Räikkönen",
        answer: 2
    },
    {
        question: "¿Qué piloto es conocido como 'El Maestro' en la historia de la Fórmula 1?",
        choice1: "Michael Schumacher",
        choice2: "Ayrton Senna",
        choice3: "Juan Manuel Fangio",
        choice4: "Niki Lauda",
        answer: 3
    },
    {
        question: "¿Qué equipo ha ganado más campeonatos de constructores en la Fórmula 1?",
        choice1: "Ferrari",
        choice2: "Mercedes",
        choice3: "Williams",
        choice4: "McLaren",
        answer: 1
    },
    {
        question: "¿En qué año debutó Lewis Hamilton en la Fórmula 1?",
        choice1: "2005",
        choice2: "2006",
        choice3: "2007",
        choice4: "2008",
        answer: 3
    },
    {
        question: "¿Qué piloto ganó su primer y único campeonato mundial de Fórmula 1 en 2007?",
        choice1: "Fernando Alonso",
        choice2: "Lewis Hamilton",
        choice3: "Kimi Räikkönen",
        choice4: "Felipe Massa",
        answer: 3
    },
    {
        question: "¿Cuál es el nombre del circuito en Japón que alberga el Gran Premio de Japón?",
        choice1: "Suzuka",
        choice2: "Fuji",
        choice3: "Motegi",
        choice4: "Okayama",
        answer: 1
    },
    {
        question: "¿Qué equipo de Fórmula 1 es conocido como 'Las Flechas Plateadas'?",
        choice1: "Red Bull Racing",
        choice2: "Mercedes",
        choice3: "Ferrari",
        choice4: "McLaren",
        answer: 2
    },
    {
        question: "¿En qué año se celebró la primera carrera de las 500 Millas de Indianápolis?",
        choice1: "1909",
        choice2: "1911",
        choice3: "1920",
        choice4: "1930",
        answer: 2
    },
    {
        question: "¿Cuál es el nombre del piloto conocido como 'El Profesor' en la Fórmula 1?",
        choice1: "Alain Prost",
        choice2: "Nigel Mansell",
        choice3: "Nelson Piquet",
        choice4: "Damon Hill",
        answer: 1
    },
    {
        question: "¿Qué piloto ganó el campeonato mundial de Fórmula 1 en 1992?",
        choice1: "Nigel Mansell",
        choice2: "Alain Prost",
        choice3: "Ayrton Senna",
        choice4: "Damon Hill",
        answer: 1
    },
    {
        question: "¿En qué país se celebra el Gran Premio de Silverstone?",
        choice1: "Francia",
        choice2: "Reino Unido",
        choice3: "España",
        choice4: "Italia",
        answer: 2
    },
    {
        question: "¿Cuál es el nombre del circuito donde se celebra el Gran Premio de Canadá?",
        choice1: "Circuit de la Sarthe",
        choice2: "Circuit de Monaco",
        choice3: "Circuit Gilles Villeneuve",
        choice4: "Circuit de Spa-Francorchamps",
        answer: 3
    },
    {
        question: "¿Qué piloto ganó el campeonato mundial de Fórmula 1 en 1996?",
        choice1: "Michael Schumacher",
        choice2: "Jacques Villeneuve",
        choice3: "Damon Hill",
        choice4: "Mika Häkkinen",
        answer: 3
    },
    {
        question: "¿Qué piloto es conocido por su apodo 'Iceman'?",
        choice1: "Sebastian Vettel",
        choice2: "Lewis Hamilton",
        choice3: "Kimi Räikkönen",
        choice4: "Fernando Alonso",
        answer: 3
    },
    {
        question: "¿Cuál es el nombre del circuito en Brasil que alberga el Gran Premio de Brasil?",
        choice1: "Autódromo José Carlos Pace",
        choice2: "Autódromo Juan y Oscar Gálvez",
        choice3: "Autódromo de Interlagos",
        choice4: "Autódromo de Jacarepaguá",
        answer: 3
    },
    {
        question: "¿Qué piloto ganó el campeonato mundial de Fórmula 1 en 2005?",
        choice1: "Fernando Alonso",
        choice2: "Michael Schumacher",
        choice3: "Kimi Räikkönen",
        choice4: "Lewis Hamilton",
        answer: 1
    },
    {
        question: "¿En qué país se celebra el Gran Premio de Suzuka?",
        choice1: "China",
        choice2: "Corea del Sur",
        choice3: "Japón",
        choice4: "Malasia",
        answer: 3
    },
    {
        question: "¿Qué piloto ganó el campeonato mundial de Fórmula 1 en 2009?",
        choice1: "Sebastian Vettel",
        choice2: "Jenson Button",
        choice3: "Lewis Hamilton",
        choice4: "Fernando Alonso",
        answer: 2
    },
    {
        question: "¿Qué equipo de Fórmula 1 tiene el apodo 'El Caballo Rampante'?",
        choice1: "McLaren",
        choice2: "Red Bull Racing",
        choice3: "Ferrari",
        choice4: "Mercedes",
        answer: 3
    },
    {
        question: "¿En qué país se celebra el Gran Premio de Spa-Francorchamps?",
        choice1: "Francia",
        choice2: "Bélgica",
        choice3: "Países Bajos",
        choice4: "Alemania",
        answer: 2
    },
    {
        question: "¿Qué piloto ganó el campeonato mundial de Fórmula 1 en 1994?",
        choice1: "Damon Hill",
        choice2: "Jacques Villeneuve",
        choice3: "Michael Schumacher",
        choice4: "Nigel Mansell",
        answer: 3
    },
    {
        question: "¿Qué piloto tiene el récord de más victorias en la historia de la Fórmula 1?",
        choice1: "Michael Schumacher",
        choice2: "Lewis Hamilton",
        choice3: "Ayrton Senna",
        choice4: "Alain Prost",
        answer: 2
    },
    {
        question: "¿Cuál es el nombre del circuito en Alemania que alberga el Gran Premio de Alemania?",
        choice1: "Hockenheimring",
        choice2: "Nürburgring",
        choice3: "Sachsenring",
        choice4: "Oschersleben",
        answer: 1
    }
];


const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;
const QUESTION_TIME = 15;

const showNotification = (message, isCorrect) => {
    notification.innerText = message;
    notification.classList.add(isCorrect ? 'correct' : 'incorrect');
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
        notification.classList.remove('correct', 'incorrect');
    }, 1000);
};

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    startTimer();
};

const startTimer = () => {
    timer = QUESTION_TIME;
    timerText.innerText = timer;
    progress.style.width = '100%';
    timerInterval = setInterval(() => {
        timer--;
        timerText.innerText = timer;
        progress.style.width = `${(timer / QUESTION_TIME) * 100}%`;

        if (timer <= 0) {
            clearInterval(timerInterval);
            getNewQuestion();
        }
    }, 1000);
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        showNotification(classToApply === "correct" ? "Correcto!" : "Incorrecto!", classToApply === "correct");

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // Pintar la respuesta correcta en verde si la respuesta seleccionada es incorrecta
        if (classToApply === "incorrect") {
            const correctChoice = choices.find(choice => choice.dataset["number"] == currentQuestion.answer);
            correctChoice.parentElement.classList.add("correct");
        }

        clearInterval(timerInterval);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            if (classToApply === "incorrect") {
                const correctChoice = choices.find(choice => choice.dataset["number"] == currentQuestion.answer);
                correctChoice.parentElement.classList.remove("correct");
            }
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
