console.log("Welcome to HarmonyX");

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
    {songName:"Chanakya Neeti-Hindi-Chapter 1", filePath: "pd5/1.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "Chanakya Neeti-Hindi-Chapter 2", filePath: "pd5/2.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "Chanakya Neeti-Hindi-Chapter 3", filePath: "pd5/3.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "Chanakya Neeti-Hindi-Chapter 4", filePath: "pd5/4.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "Chanakya Neeti-Hindi-Chapter 5", filePath: "pd5/5.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "Chanakya Neeti-Hindi-Chapter 6", filePath: "pd5/6.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "PChanakya Neeti-Hindi-Chapter7", filePath: "pd5/7.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
    {songName: "Chanakya Neeti-Hindi-Chapter 8", filePath: "pd5/8.mp3", coverPath: "https://i.scdn.co/image/ab67656300005f1f1cafa02f81a9891c432f2563"},
]

// Populate song items with data
function populateSongItems() {
    songItems.forEach((element, i) => { 
        element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    });
}
populateSongItems();

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

const highlightCurrentSong = () => {
    // Remove 'playing' class from any currently playing song
    const currentlyPlaying = document.querySelector('.playing');
    if (currentlyPlaying) {
        currentlyPlaying.classList.remove('playing');
        currentlyPlaying.querySelector('.songName').style.color = ''; // reset to default color
    }

    // Add 'playing' class to the current song item
    const currentSongItem = songItems[songIndex];
    currentSongItem.classList.add('playing');
    currentSongItem.querySelector('.songName').style.color = '#d1b278'; // highlight with gray color
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
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        // Update song card with selected song information
        songCardImage.src = songs[songIndex].coverPath;
        songCardTitle.innerText = songs[songIndex].songName;

        // Show the card
        songCard.classList.remove('hidden');

        // Highlight the current song
        highlightCurrentSong();
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
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update song card with selected song information
    songCardImage.src = songs[songIndex].coverPath;
    songCardTitle.innerText = songs[songIndex].songName;

    // Show the card
    songCard.classList.remove('hidden');

    // Highlight the current song
    highlightCurrentSong();
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
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update song card with selected song information
    songCardImage.src = songs[songIndex].coverPath;
    songCardTitle.innerText = songs[songIndex].songName;

    // Show the card
    songCard.classList.remove('hidden');

    // Highlight the current song
    highlightCurrentSong();
});

document.addEventListener('DOMContentLoaded', () => {
    // Get the search bar and song list items
    const searchBar = document.querySelector('.search-box');

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
function navigateToHome() {
    // Show the loader
    document.getElementById('loader').classList.remove('hidden');
    
    // Simulate a page transition with a timeout (e.g., 1 second) to hide the loader
    // Adjust the duration as needed to match the actual loading time
    setTimeout(() => {
      window.location.href = 'harmonyX.html';
    }, 2500); // 1000 milliseconds = 1 second
  }
