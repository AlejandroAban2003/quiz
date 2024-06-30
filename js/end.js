const finalScoreText = document.getElementById('finalScore');
const finalMessageText = document.getElementById('finalMessage');
const retryButton = document.getElementById('retryButton');

const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScoreText.innerText = `Obtiviste: ${mostRecentScore} puntos`;

let finalMessage = "";
if (mostRecentScore >= 8) {
    finalMessage = "😁Felicidades 😁";
} else if (mostRecentScore >= 5) {
    finalMessage = "😊Muy bien 😊";
} else if (mostRecentScore >= 1) {
    finalMessage = "😢Tienes que estudiar😢";
} else {
    finalMessage = "😭Que mal 😭";
}

finalMessageText.innerText = finalMessage;

retryButton.addEventListener('click', () => {
    window.location.assign('/index.html');
});
