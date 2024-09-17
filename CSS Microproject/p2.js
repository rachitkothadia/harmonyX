console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// New elements for the song card
let songCard = document.getElementById('songCard');
let songCardImage = document.getElementById('songCardImage');
let songCardTitle = document.getElementById('songCardTitle');
let songCardArtist = document.getElementById('songCardArtist');

let songs = [
    {songName:"Pallikoodam - The Farewell Song - From Natpe Thunai", filePath: "songs1/1.mp3", coverPath: "covers1/1.jpg"},
    {songName: "Mustafaa Mustafaa-A.R.Rahman", filePath: "songs1/2.mp3", coverPath: "covers1/2.jpg"},
    {songName: "Taxi Taxi-A.R.Rahman", filePath: "songs1/3.mp3", coverPath: "covers1/3.jpg"},
    {songName: "Pakoda Song-A H Kaashik", filePath: "songs1/4.mp3", coverPath: "covers1/4.jpg"},
    {songName: "Jalsa-Rajnith Govind", filePath: "songs1/5.mp3", coverPath: "covers1/5.jpg"},
    {songName: "Dosth Bada Dosth-Haricharan", filePath: "songs1/6.mp3", coverPath: "covers1/6.jpg"},
    {songName: "Yealae Yealae Dosthu Da-Harris Jayaraj", filePath: "songs1/7.mp3", coverPath: "covers1/7.jpg"},
    {songName: "Natpukulle-Yuvan Shankar Raja", filePath: "songs1/8.mp3", coverPath: "covers1/8.jpg"},
    {songName: "Vengamavan-Hiphop Tamizha", filePath: "songs1/9.mp3", coverPath: "covers1/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

// Populate song items with data
function populateSongItems() {
    songItems.forEach((element, i) => { 
        element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    });
}
populateSongItems();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to update the song durations in the UI
function updateSongDurations() {
    songItems.forEach((element, i) => {
        const audio = new Audio(songs[i].filePath);
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            const durationElement = element.querySelector('.songDuration');
            if (durationElement) {
                durationElement.innerText = duration;
            }
        });
    });
}

// Call the function to update song durations when the page loads
updateSongDurations();

// Listen to Events for time updates and seekbar
audioElement.addEventListener('timeupdate', () => { 
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
        myProgressBar.value = progress;
    }
});

myProgressBar.addEventListener('change', () => {
    if (audioElement.duration) {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;

        // Update duration dynamically on play
        audioElement.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audioElement.duration);
            document.querySelector('.currentSongDuration').innerText = duration;
        });

        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        // Update song card with selected song information
        songCardImage.src = songs[songIndex].coverPath;
        songCardTitle.innerText = songs[songIndex].songName;

        // Show the card
        songCard.classList.remove('hidden');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;

    // Update duration dynamically on play
    audioElement.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audioElement.duration);
        document.querySelector('.currentSongDuration').innerText = duration;
    });

    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update song card with selected song information
    songCardImage.src = songs[songIndex].coverPath;
    songCardTitle.innerText = songs[songIndex].songName;

    // Show the card
    songCard.classList.remove('hidden');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;

    // Update duration dynamically on play
    audioElement.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audioElement.duration);
        document.querySelector('.currentSongDuration').innerText = duration;
    });

    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update song card with selected song information
    songCardImage.src = songs[songIndex].coverPath;
    songCardTitle.innerText = songs[songIndex].songName;
    // Show the card
    songCard.classList.remove('hidden');
});
document.addEventListener('DOMContentLoaded', () => {
    // Get the search bar and song list items
    const searchBar = document.querySelector('.search-box');
    const songItems = Array.from(document.getElementsByClassName('songItem'));

    // Add an event listener to the search bar
    searchBar.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();

        songItems.forEach(function(item) {
            const songTitle = item.querySelector('.songName').textContent.toLowerCase(); // Adjusted to '.songName' class

            // Check if the song title contains the search text
            if (songTitle.includes(searchText)) {
                item.style.display = ''; // Show the song item
            } else {
                item.style.display = 'none'; // Hide the song item
            }
        });
    });
});
// Function to handle playing song
function playSong(songElement) {
    // Remove 'playing' class from any currently playing song
    const currentlyPlaying = document.querySelector('.playing');
    if (currentlyPlaying) {
        currentlyPlaying.classList.remove('playing');
    }

    // Add 'playing' class to the clicked song element
    songElement.classList.add('playing');

    // Additional code to handle playing the song
    // ...
}

// Example of how to attach the event listener to each song item
const songitems = document.querySelectorAll('.songItem'); // Assuming each song item has a class 'song-item'

songItems.forEach(function(item) {
    item.addEventListener('click', function() {
        playSong(item);
    });
});
function navigateToHome() {
    // Show the loader
    document.getElementById('loader').classList.remove('hidden');
    
    // Simulate a page transition with a timeout (e.g., 1 second) to hide the loader
    // Adjust the duration as needed to match the actual loading time
    setTimeout(() => {
      window.location.href = 'harmonyX.html';
    }, 2500); // 1000 milliseconds = 1 second
  }
  

