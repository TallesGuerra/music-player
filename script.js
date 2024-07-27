let musics = [
    {
        title: 'Skating On The Uppers',
        artist: 'National Sweetheart',
        src: '/src/Skating On the Uppers - National Sweetheart.mp3',
        img: '/src/rock.jpg'
    },
    {
        title: 'Oh Fire',
        artist: 'Carmen María and Edu',
        src: '/src/Oh Fire - Carmen María and Edu Espinal.mp3',
        img: '/src/reggae.jpg'
    },
    {
        title: 'Headlands',
        artist: 'National Sweetheart',
        src: '/src/Headlands - National Sweetheart.mp3',
        img: '/src/chill.jpg'
    }
];

let music = document.querySelector('audio');
let indexMusic = 0;

let musicDuration = document.querySelector('.end');
let image = document.querySelector('img');
let musicTitle = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');

renderMusic(indexMusic);

// Eventos 
document.querySelector('.btn-play').addEventListener('click', playMusic);

document.querySelector('.btn-pause').addEventListener('click', pauseMusic);

music.addEventListener('timeupdate', barUpdate);

document.querySelector('.before').addEventListener('click', () => {
    indexMusic--;
    if (indexMusic < 0) {
        indexMusic = 2;
    }
    renderMusic(indexMusic);
});

document.querySelector('.after').addEventListener('click', () => {
    indexMusic++;
    if (indexMusic > 2) {
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

// Functions
function renderMusic(index) {
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        musicTitle.textContent = musics[index].title;
        artistName.textContent = musics[index].artist;
        image.src = musics[index].img;
        musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
    });
}

function playMusic() {
    music.play();
    document.querySelector('.btn-pause').style.display = 'block';
    document.querySelector('btn-play').style.display = 'none';
}

function pauseMusic() {
    music.pause();
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('btn-play').style.display = 'block';
}

function barUpdate() {
    let bar = document.querySelector('progress');
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';

    let tempoDecorrido = document.querySelector('.start');
    tempoDecorrido.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds) {
    let labelMinutes = Math.floor(seconds / 60);

    let labelSeconds = seconds % 60;
    if (labelSeconds < 10) {
        labelSeconds = '0' + labelSeconds;
    }

    return labelMinutes + ':' + labelSeconds;
}

