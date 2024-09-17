// Get the search box input element
const searchBox = document.querySelector('.search-box');

// Add an event listener to detect input in the search box
searchBox.addEventListener('input', function () {
    const query = searchBox.value.toLowerCase(); // Get the search input and convert to lowercase

    // Get all the song/podcast cards
    const cards = document.querySelectorAll('.song-podcast-card');

    // Loop through each card to check if it matches the query
    cards.forEach(card => {
        // Get the text content of the h1 and p elements
        const title = card.querySelector('.song-podcast-image-head').textContent.toLowerCase();
        const description = card.querySelector('.song-podcast-image-para').textContent.toLowerCase();

        // If the title or description includes the search query, show the card; otherwise, hide it
        if (title.includes(query) || description.includes(query)) {
            card.style.display = ''; // Use the default display style, reset it
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
});
