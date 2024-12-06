function createSparkle() {
    const rectangle = document.getElementById('rectangle');
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const rectWidth = rectangle.offsetWidth;
    const rectHeight = rectangle.offsetHeight;

    const x = Math.random() * (rectWidth - 10);
    const y = Math.random() * (rectHeight - 10);
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    rectangle.appendChild(sparkle);
}

for (let i = 0; i < 10; i++) {
     createSparkle();
}

function createStar2() {
    const rectangle = document.getElementById('rectangle');
    const star2 = document.createElement('div');
    star2.classList.add('star2');
    
    const rectWidth = rectangle.offsetWidth;
    const rectHeight = rectangle.offsetHeight;

    const x = Math.random() * (rectWidth - 20);
    const y = Math.random() * (rectHeight - 20);
    
    star2.style.left = `${x}px`;
    star2.style.top = `${y}px`;

    rectangle.appendChild(star2);
    
    setTimeout(() => {
        star2.remove();
    }, 2000);
}

setInterval(createStar2, 300);

let currentIndex = 0;
const gallery = document.getElementById('gallery');
const images = document.querySelectorAll('.image-container');

function updateGallery() {
    images.forEach((image, index) => {
        image.classList.remove('active');
        image.classList.remove('inactive');
    });
    
    images[currentIndex].classList.add('active');
    
    for (let i = 0; i < images.length; i++) {
        if (i !== currentIndex) {
            images[i].classList.add('inactive');
        }
    }
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateGallery();
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1;
    }
    updateGallery();
}

function chooseRandomImage() {
    currentIndex = Math.floor(Math.random() * images.length);
    updateGallery();
}

document.getElementById('nextBtn').addEventListener('click', nextImage);
document.getElementById('prevBtn').addEventListener('click', prevImage);

chooseRandomImage();

const audioFiles = {
    image1: new Audio('audios/audio1.mp3'),
    image2: new Audio('audios/audio2.mp3'),
    image3: new Audio('audios/audio1.mp3'),
};

let currentAudio = null;

function updateCurrentAudio() {
    const activeImage = document.querySelector('.image-container.active');
    const audioKey = activeImage.id;
    currentAudio = audioFiles[audioKey];
}

function toggleAudio() {
    if (!currentAudio) return;

    Object.values(audioFiles).forEach(audio => {
        if (!audio.paused && audio !== currentAudio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    if (currentAudio.paused) {
        currentAudio.play();
    } else {
        currentAudio.pause();
    }
}

document.getElementById('nextBtn').addEventListener('click', () => {
    nextImage();
    updateCurrentAudio();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevImage();
    updateCurrentAudio();
});

document.getElementById('playAudioButton').addEventListener('click', toggleAudio);

chooseRandomImage();
updateCurrentAudio();
const progressBar = document.getElementById('progressBar');
const timeInfo = document.getElementById('timeInfo');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgressBar() {
    if (currentAudio) {
        const currentTime = currentAudio.currentTime;
        const duration = currentAudio.duration;

        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;

        timeInfo.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
}

currentAudio.addEventListener('timeupdate', updateProgressBar);

currentAudio.addEventListener('ended', () => {
    progressBar.style.width = '0%';
    timeInfo.textContent = `0:00 / ${formatTime(currentAudio.duration)}`;
});

currentAudio.addEventListener('loadedmetadata', () => {
    timeInfo.textContent = `0:00 / ${formatTime(currentAudio.duration)}`;
});
