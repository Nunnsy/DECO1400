// Types of data: message, choice, status(unlock is in seconds), and end.
// var GAME_DATA_JSON = {}; IT IS LOADED EXTERNALLY IN game.html (gamedata.js).

var gamePath = [];

var articleContainer = $('<article>').addClass('animated fadeIn');
var elementBuffer = null;

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
function buttonPress(target, id) {
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

    // Edit the decision article element and made the buttons no longer clickable.
    $('article:last-of-type').find('.choice').addClass('chosen');
    // Gray out the button which was not clicked.
    $('article:last-of-type').find('#button' + otherId).addClass('choice-no');
    // Direct the story to the next element respective to the button's target.
    changePage(target, id);
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

function getData(id) {
    // Grabs the required data for the path in which the user has taken.
    var dataArray = $.grep(GAME_DATA_JSON, function(obj) {
        return obj.id === id;
    });

    // Grabs the first entry of the JSON data. As the ids are unique, only the first is required.
    return dataArray[0];
}

function continueStory() {
    localStorage.removeItem('storyUnlock');

    var lastStatus = gamePath[gamePath.length - 1];
    changePage(getData(lastStatus).target);
}

function lockStory(seconds) {
    var unlockDate = getCurrentDate();
    console.log(unlockDate);

    // Use the seconds given to the function to set a new date object.
    unlockDate.setSeconds(unlockDate.getSeconds() + parseInt(seconds));
    console.log(unlockDate);

    localStorage.setItem('storyUnlock', unlockDate);

    setTimeout(function() {
        continueStory();
    }, unlockDate.getTime() - getCurrentDate().getTime());
}


// ADD ELEMENT TO PAGE

function addData(id, live, choice) {
    var data = getData(id);

    // Use a different method of adding HTML dependent on what the data is.
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
            console.error('Unexpected data type: ' + data.type);
    }
}

function addMessage(data, liveData) {

    if (liveData) {
        // First show that Brian is replying

        elementBuffer = articleContainer.clone().append(
            $('<div>').addClass('message load').append(
                $('<span>').addClass('dots').html('&#8230;')
            )
        );

        $('.content').append(elementBuffer);

        scrollToBottom();

        // Set a delay to change the dots to the message depending on how long the message is
        setTimeout(function() {
            var lastMessage = $('div:last');
            lastMessage.find('.dots').remove();
            lastMessage.removeClass('load').addClass('animated fadeIn');
            lastMessage.html(data.message);

            changePage(data.target);

            scrollToBottom();
        }, 50 * data.message.length + 100);
    } else {

        elementBuffer = articleContainer.clone().append(
            $('<div>').addClass('message').html(data.message)
        );

        $('.content').append(elementBuffer);
    }
}

function addChoice(data, liveData, lastId) {
    elementBuffer = articleContainer.clone().append(
        $('<div>').addClass('choice').append(
            $('<a>').attr('id', 'button0').attr('onclick', 'buttonPress(\'' + data.choice[0].target + '\', 0)').html(data.choice[0].text)
        ).append(
            $('<a>').attr('id', 'button1').attr('onclick', 'buttonPress(\'' + data.choice[1].target + '\', 1)').html(data.choice[1].text)
        )
    );

    $('.content').append(elementBuffer);

    if (liveData) {
        scrollToBottom();
    } else {
        var otherId = null;

        if (lastId != null) {
            switch (lastId) {
                case 0:
                    otherId = 1;
                    break;
                case 1:
                    otherId = 0;
                    break;
            }
            elementBuffer.find('div').addClass('chosen');
            elementBuffer.find('div #button' + otherId).addClass('choice-no');
        }
    }
}

function addStatus(data, liveData) {
    elementBuffer = articleContainer.clone().append(
        $('<div>').addClass('status').html('* ' + data.text + ' *')
    );

    $('.content').append(elementBuffer);

    if (liveData) {
        scrollToBottom();
        lockStory(data.unlock);
    }
}

function addEnd(liveData) {

    elementBuffer = articleContainer.clone().append(
        $('<div>').addClass('end').append(
            $('<a>').attr('href', 'index.html').html('Return Home')
        )
    );

    $('.content').append(elementBuffer);

    if (liveData) {
        scrollToBottom();
    }
}


// SAVE FUNCTIONS

function loadPath() {
    gamePath = JSON.parse(localStorage.getItem('storyPath'));
    console.log(gamePath);

    var lastId = null;

    // Iterate through all previously made paths
    $.each(gamePath, function(index, pathValue) {
        if (pathValue.indexOf(':') != -1) {
            var splitPath = pathValue.split(':');
            var id = splitPath[0];
            var choice = parseInt(splitPath[1]);
        } else {
            var id = pathValue;
        }
        addData(id, false, choice);

        lastId = id;
    });

    var lastData = getData(lastId);

    if (lastData.type == 'message') {
        changePage(lastData.target);
    }

    scrollToBottom();
}

// UTILITY FUNCTIONS

function getCurrentDate() {
    return new Date();
}

// When the document has loaded, execute following code
$(function() {
    // Check whether story data exists in storage for user to continue where they left
    if (localStorage.getItem('storyPath') == null) {
        // If no data exists, begin the story from the start
        changePage('Start');
    } else {
        // Load data to continue the story
        loadPath();
    }

    // Check to see if we were waiting for Brian to respond
    if (localStorage.getItem('storyUnlock') != null) {
        unlockDate = Date.parse(localStorage.getItem('storyUnlock'));
        var dateNow = getCurrentDate();

        if (unlockDate <= dateNow) {
            continueStory();
        } else {
            lockStory(dateNow.getMinutes() - unlockDate.getMinutes());
        }
    }
});
