var confirm_shown = false;

function resetGame() {
  if (confirm_shown) {
    confirm();
  } else {
    $('.reset-button').text('Are you sure?');
    confirm_shown = true;
  }
}

function confirm() {
    localStorage.removeItem('storyPath');
    localStorage.removeItem('storyUnlock');

    $('.reset-button').addClass('reset-button-hidden');
    $('.reset-container').addClass('animated fadeOut');
}

if (localStorage.getItem('storyPath') != null) {
  $('.reset-container').removeClass('hide');
}
