// Types of data: message, choice, status(unlock is in seconds), and end.
// var GAME_DATA_JSON = {}; IT IS LOADED EXTERNALLY IN game.html (gamedata.js).

var gamePath = [];

var articleContainer = $('<article>').addClass('animated fadeIn');
var elementBuffer = null;

var buttonTargets = [];

// The parent method in adding the next article.
function changePage(id, choiceNumber) {
    // Add last page change to story path.
    addToPath(id, choiceNumber);

    // Adds a delay so messages appear more organically.
    setTimeout(function() {
        addData(id, true, null);
    }, 500);
}

// Called when a decision button is pressed.
function buttonPress(id) {
    // Used to define the identifier of the other button.
    var otherId = null;

    switch (id) {
        case 0:
            otherId = 1;
            break;
        case 1:
            otherId = 0;
            break;
    }

    // Change the button to signify a decision has been made.
    buttonChosen($('article:last-of-type'), otherId);

    // Direct the story to the next element respective to the button's target.
    changePage(buttonTargets[id], id);
}

function scrollToBottom() {
    // A small command to scroll the page to the lowest point in half a second.
    $('html, body').animate({
            scrollTop: $(document).height() - $(window).height()
        },
        500,
        "swing"
    );
}

function addToPath(id, choiceNumber) {
    // If a choice was made, add the identifier onto the game path deliniated with a ':'.
    if (choiceNumber != null) {
        // Get the last id from the game path and remove it from the array.
        var lastId = gamePath.pop();
        // Append either a 0 or 1 depending on the choice.
        lastId = lastId + ':' + choiceNumber;
        // Add it to the end of the game path array.
        gamePath.push(lastId);
    }

    // Add the new id to the path.
    gamePath.push(id);

    // Put the updated game path into local storage.
    localStorage.setItem('storyPath', JSON.stringify(gamePath));

    // For debug purposes.
    console.log(gamePath);
}

// Returns the data with the specified identifier.
function getData(id) {
    // Grabs the required data for the path in which the user has taken.
    var dataArray = $.grep(GAME_DATA_JSON, function(obj) {
        return obj.id === id;
    });

    // Grabs the first entry of the JSON data. As the ids are unique, only the first is required.
    return dataArray[0];
}

// Continue the story once the unlock time has been reached.
function continueStory() {
    // Remove the unlock date from local storage.
    localStorage.removeItem('storyUnlock');

    // Get the last status data by indexing the last element in the array.
    var lastStatus = getData(gamePath[gamePath.length - 1]);
    // Change page to the specified target in the last status.
    changePage(lastStatus.target);
}

// Locks the story for a given amount of time in seconds.
function lockStory(seconds) {
    // Note the date object handles time down to milliseconds.
    // First declare the unlock date as the current date.
    var unlockDate = getCurrentDate();
    // Logs the current date.
    console.log(unlockDate);

    // Sets the current date 'seconds' seconds further into the future.
    unlockDate.setSeconds(unlockDate.getSeconds() + parseInt(seconds));
    // Logs the unlock date of the story.
    console.log(unlockDate);

    // Add this unlock date to the local storage in case the user leaves.
    localStorage.setItem('storyUnlock', unlockDate);

    // If the user stays on the page, wait till the time has elapsed before continuing.
    setTimeout(function() {
        continueStory();
    }, unlockDate.getTime() - getCurrentDate().getTime());
}


// ADD ELEMENT TO PAGE

function addData(id, live, choice) {
    // First get the data for the given identifier.
    var data = getData(id);

    // Use a different method of appending content depending on the data type.
    switch (data.type) {
        case 'message':
            addMessage(data, live);
            break;
        case 'choice':
            addChoice(data, live, choice);
            break;
        case 'status':
            addStatus(data, live);
            break;
        case 'end':
            addEnd(live);
            break;
        default:
            // In case there is unexpected data, log this error so we can trace it.
            console.error('Unexpected data type: \'' + data.type + '\' at ID: ' + data.id);
    }
}

function addMessage(data, liveData) {

    // If we are dealing with the live story, follow this method. otherwise if we're reloading the data, take a different route.
    if (liveData) {
        // First show that Brian is replying
        elementBuffer = articleContainer.clone().append(
            $('<div>').addClass('message load').append(
                $('<span>').addClass('dots').html('&#8230;')
            )
        );

        // Append what is currently in the element buffer.
        appendContent();

        // Scroll the page to the bottom so the user can see the new content.
        scrollToBottom();

        // Set a delay to change the dots to the message depending on how long the message is.
        setTimeout(function() {
            // Find the last message.
            var lastMessage = $('.message:last');
            // Remove the elipsis and its container.
            lastMessage.find('.dots').remove();
            // Change the class from 'load' to both 'animated' and 'fadeIn' so message appears gracefully.
            lastMessage.removeClass('load').addClass('animated fadeIn');
            // Add the content of the message to the container. .html() is used as some messages contain HTML tags.
            lastMessage.html(data.message);

            // Advance the story with the message's target.
            changePage(data.target);

            // Scroll the page to the bottom so the user can see the new content.
            scrollToBottom();
        }, 50 * data.message.length + 100);
    } else {
        // If we are loading old session data, don't worry about the dots animation just add the content.
        elementBuffer = articleContainer.clone().append(
            $('<div>').addClass('message').html(data.message)
        );

        // Append what is currently in the element buffer.
        appendContent();
    }
}

function addChoice(data, liveData, lastId) {
    // Generate the two decision buttons and their container unique identifiers.
    elementBuffer = articleContainer.clone().append(
        $('<div>').addClass('choice').append(
            $('<a>').attr('id', 'button0').html(data.choice[0].text)
        ).append(
            $('<a>').attr('id', 'button1').html(data.choice[1].text)
        )
    );

    // Assign the current button targets to last loaded buttons.
    buttonTargets = [data.choice[0].target, data.choice[1].target];

    // Append what is currently in the element buffer.
    appendContent();

    if (liveData) {
        // Scroll the page to the bottom so the user can see the new content.
        scrollToBottom();
    } else {
        // We need to show the path the user has taken already.

        // Declare a variable to store the non-chosen button identifer.
        var otherId = null;

        // Set the just formed variable to the opposite of the chosen.
        if (lastId != null) {
            switch (lastId) {
                case 0:
                    otherId = 1;
                    break;
                case 1:
                    otherId = 0;
                    break;
            }

            // Change the button to signify a decision has been made.
            buttonChosen(elementBuffer, otherId);
        }
    }

    // Must place the event handler here as new content is generated and we need to bind this to an event.
    // When a decision is made on the two options available, run the following function.
    $('.choice:last a').click(function() {
        // Determine which button was pressed and run the buttonPress method with the respective identifier.
        if ($(this).attr('id') == 'button0') {
            buttonPress(0);
        } else if ($(this).attr('id') == 'button1') {
            buttonPress(1);
        }
    });
}

function addStatus(data, liveData) {
    // Generate the status data.
    elementBuffer = articleContainer.clone().append(
        $('<div>').addClass('status').html('* ' + data.text + ' *')
    );

    // Append what is currently in the element buffer.
    appendContent();

    if (liveData) {
        // Scroll the page to the bottom so the user can see the new content.
        scrollToBottom();

        // Parse the lockout (in seconds) to the lockStory() function.
        lockStory(data.unlock);
    }
}

function addEnd(liveData) {
    // Generate the story's end content.
    elementBuffer = articleContainer.clone().append(
        $('<div>').addClass('end').append(
            $('<a>').attr('href', 'index.html').html('Return Home')
        )
    );

    // Append what is currently in the element buffer.
    appendContent();

    if (liveData) {
        // Scroll the page to the bottom so the user can see the new content.
        scrollToBottom();
    }
}

// Called when a decision button needs to be grayed out and for the button to lose interactivity.
function buttonChosen(container, otherId) {
    // Edit the decision article element and made the buttons no longer clickable.
    container.find('.choice').addClass('chosen');
    // Gray out the button which was not clicked.
    container.find('#button' + otherId).addClass('choice-no');
}

// SAVE FUNCTIONS

function loadPath() {
    // Load and parse the stored path array (in JSON format) from local storage into the current game path array.
    gamePath = JSON.parse(localStorage.getItem('storyPath'));
    // Log the stored game path.
    console.log(gamePath);

    // Declare a variable outside the loop to retain the last identifer in the loaded game path.
    var lastId = null;

    // Iterate through all entries in the loaded game path.
    $.each(gamePath, function(index, pathValue) {
        // Check to see if a colon exists in the string.
        if (pathValue.indexOf(':') != -1) {
            // Split the value to separate the identifer of the choice and the user's decision.
            var splitPath = pathValue.split(':');
            // Set the values accordingly.
            var id = splitPath[0];
            var choice = parseInt(splitPath[1]);
        } else {
            // Set the identifer to the value given as no other data is present in that particular string.
            var id = pathValue;
        }

        // Add the data to the story, indicating the identifer, that it is not live and the choice if a decision was made.
        addData(id, false, choice);

        // Set the last identifer to the current identifer such that the last iteration is the last identifer.
        lastId = id;
    });

    // Get the data from the last identifer.
    var lastData = getData(lastId);

    // If the data is a message, load the next part of the story.
    if (lastData.type == 'message') {
        // Required as if the user leaves the game whilst recieving a message, the following message will not load.
        changePage(lastData.target);
    }

    // Scroll the page to the bottom so the user can see the new content.
    scrollToBottom();
}

// UTILITY FUNCTIONS

function getCurrentDate() {
    // Returns the current date & time.
    return new Date();
}

function appendContent() {
    // Adds whatever is in the content buffer onto the page.
    $('.content').append(elementBuffer);
}

// When the document has loaded, execute following code
$(function() {
    // Check whether story data exists in storage for user to continue where they left.
    if (localStorage.getItem('storyPath') == null) {
        // If no data exists, begin the story from the start.
        changePage('Start');
    } else {
        // Load data to continue the story.
        loadPath();
    }

    // Check to see if we were waiting for Brian to respond.
    if (localStorage.getItem('storyUnlock') != null) {
        // Set the unlock date to what is stored in the local storage.
        unlockDate = Date.parse(localStorage.getItem('storyUnlock'));
        // Get the current date.
        var dateNow = getCurrentDate();

        // Check to see if the current date is at or after the unlock date.
        if (unlockDate <= dateNow) {
            // If it is, continue the story.
            continueStory();
        } else {
            // If not, lock the story till that time.
            lockStory(dateNow.getMinutes() - unlockDate.getMinutes());
        }
    }
});
