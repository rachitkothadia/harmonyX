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
    {songName:"Tum Hi Ho Bandhu- Neeraj Shridhar, Kavita Seth, Pritam", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Matargashti-Mohit Chauhan", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Buddhu Sa Mann-Amaal Mallik, Armaan Malik, Abhiruchi Chand", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Ik Junoon (Paint It Red)-Vishal Dadlani", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Daaru Desi-Benny Dayal, Shalmali Kholgade, Pritam", filePath: "songs/5.mp3", coverPath: "covers/1.png"},
    {songName: "Jaane Kyun-Vishal-Shekhar, Vishal Dadlani", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Vele-Vishal-Shekhar, Vishal Dadlani, Shekhar Ravjiani", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Woh Din-Pritam, Arijit Singh", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Hai Junoon-KK,Pritam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
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
            const songTitle = item.querySelector('.songName').textContent.toLowerCase();

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
  



