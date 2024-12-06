

const character = document.querySelector('.character');
let direction = 1; // 1 pour aller à droite, -1 pour revenir à gauche

function moveCharacter() {
    const position = parseFloat(getComputedStyle(character).left);
    const screenWidth = window.innerWidth;

    if (position > screenWidth - 150 || position < 0) {
        direction *= -1; // Change la direction
        character.style.transform = `scaleX(${direction})`; // Inverse le GIF horizontalement
    }

    character.style.left = position + 2 * direction + 'px';
    requestAnimationFrame(moveCharacter);
}

moveCharacter();

// Régle le volume de l'audio (facultatif)
const welcomeAudio = document.getElementById('welcome-audio');
welcomeAudio.volume = 0.5; // Volume entre 0.0 et 1.0

// Optionnel : Permettre de couper l'audio au clic
document.addEventListener('click', () => {
    if (!welcomeAudio.paused) {
        welcomeAudio.pause(); // Coupe l'audio si déjà en lecture
    }
});



