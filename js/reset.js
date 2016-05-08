// Define a boolean variable that is accessible in multiple functions.
var confirm_shown = false;

// The function called when the reset button is pressed.
function resetGame() {
    // Check if the confirmation has already been shown.
    if (confirm_shown) {
        // If the confirmation has been shown, run the function to reset game progress.
        confirmReset();
    } else {
        // Change the reset button text to a confirmation queue for the user.
        $('.reset-button').text('Are you sure?');
        confirm_shown = true;
    }
}

// The function which resets the game.
function confirmReset() {
    // Remove the story path data.
    localStorage.removeItem('storyPath');

    // Check if a current story lockout exists.
    if (localStorage.getItem('storyUnlock') != null) {
        // If it does exist, remove it from the local storage.
        localStorage.removeItem('storyUnlock');
    }

    // Gracefully remove the reset button from view.
    $('.reset-button').addClass('reset-button-hidden');
    $('.reset-container').addClass('animated fadeOut');
}

// Function is run on page load to check if game data exists.
if (localStorage.getItem('storyPath') != null) {
    // Show the reset button if game data exists.
    $('.reset-container').removeClass('hide');
}
