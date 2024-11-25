//* Constante state para armazenar os objetos de view e value

const state = {
    view: {
        squares: document.querySelectorAll(".square"), // Seleciona todos os quadrados
        enemy: document.querySelector(".enemy"), // Seleciona o inimigo
        timeLeft: document.querySelector("#time-left"), // Seleciona o tempo restante
        score: document.querySelector("#score"), // Seleciona a pontuação
    },

    values: {
        gameVelocity: 1000, // Velocidade do jogo
        hitPosition: 0,
        result: 0, // Resultado do jogo
        curretTime: 60, // Tempo restante
    },
    actions: {
        timerId: setInterval(randomSquare, 1000), // Armazena o ID do temporizador
        countDownTimerId: setInterval(countDown, 1000), // Armazena o ID do temporizador de contagem regressiva
    },
};

function playSound(audioName) {
    let audio = new Audio(`./src/audio/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.curretTime--; // Decrementa o tempo restante
    state.view.timeLeft.textContent = state.values.curretTime; // Atualiza o tempo

    if (state.values.curretTime <= 0 ) {
        clearInterval(state.actions.countDownTimerId); // Limpa o temporizador de contagem regressiva
        clearInterval(state.actions.timerId); // Limpa o temporizador
        alert(`GameOver! Sua pontuação foi: ${state.values.result}`);
    }
}

function randomSquare() { // Função para selecionar um quadrado aleatório
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9); // Gera um número aleatório entre 0 e 8
    let randomSquare = state.view.squares[randomNumber]; // Seleciona um quadrado aleatório
    randomSquare.classList.add("enemy"); // Adiciona a classe enemy ao quadrado selecionado
    state.values.hitPosition = randomSquare.id; // Armazena o ID do quadrado selecionado
}

function addListnerHitBox() { 
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {   
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });    
    });    
}

function initialize() {
    addListnerHitBox(); 
}

initialize();


