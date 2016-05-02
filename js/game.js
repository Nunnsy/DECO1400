// Types of data: message, decision, status(unlock is in seconds)
// var GAME_DATA_JSON = {}; IT IS LOADED EXTERNALLY IN game.html (gamedata.js)

var gamePath = [];


// The parent method in adding the next article
function changePage(id, choiceNumber) {
    // Add last page change to story path
    addToPath(id, choiceNumber);

    // Adds a delay so messages come in more organically
    setTimeout(function() {
        addData(id, true, null);
    }, 500);
}

function buttonPress(target, id) {
    var otherId = null;

    switch (id) {
        case 0:
            otherId = 1;
            break;
        case 1:
            otherId = 0;
            break;
    }

    $('article:last-of-type').find('.choice').addClass('chosen');
    $('article:last-of-type').find('#button' + otherId).addClass('choice-no');
    changePage(target, id);
}

function scrollToBottom() {
    $('html, body').animate({
            scrollTop: $(document).height() - $(window).height()
        },
        500,
        "swing"
    );
}

function addToPath(id, choiceNumber) {
    if (choiceNumber != null) {
        var lastID = gamePath.pop();
        lastID = lastID + ':' + choiceNumber;
        gamePath.push(lastID);
    }

    gamePath.push(id.toString());

    localStorage.setItem('storyPath', JSON.stringify(gamePath));

    console.log(gamePath);
}

function getData(id) {
    // Grabs the required data for the path in which the user has taken
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

        $('.content').append('\
        <article class="animated fadeIn">\
            <div class="message load">\
                <span class="dots">&#8230;</span>\
            </div>\
        </article>\
        ');

        scrollToBottom();

        // Set a delay to change the dots to the message depending on how long the message is
        setTimeout(function() {
            $('article:last-of-type').find('.message').removeClass('load');
            $('article:last-of-type').find('.dots').remove();
            $('article:last-of-type').find('.message').append('<div class="message animated fadeIn">' + data.message + '</div>');

            changePage(data.target);

            scrollToBottom();
        }, 50 * data.message.length + 100);
    } else {
        $('.content').append('\
    <article class="animated fadeIn">\
      <div class="message">\
        <div class="message">' + data.message + '</div>\
      </div>\
    </article>\
  ');
    }
}

function addChoice(data, liveData, lastID) {
    if (liveData) {

        $('.content').append('\
          <article class="animated fadeIn">\
            <div class="choice">\
              <a id="button0" onclick="buttonPress(\'' + data.choice[0].target + '\', 0)">' + data.choice[0].text + '</a>\
              <a id="button1" onclick="buttonPress(\'' + data.choice[1].target + '\', 1)">' + data.choice[1].text + '</a>\
            </div>\
          </article>\
        ');


        scrollToBottom();
    } else {
        var otherId = null;

        if (lastID == null) {
            $('.content').append('\
      <article class="animated fadeIn">\
        <div class="choice">\
          <a id="button0" onclick="buttonPress(\'' + data.choice[0].target + '\', 0)">' + data.choice[0].text + '</a>\
          <a id="button1" onclick="buttonPress(\'' + data.choice[1].target + '\', 1)">' + data.choice[1].text + '</a>\
        </div>\
      </article>\
    ');
        } else {

            switch (lastID) {
                case 0:
                    otherId = 1;
                    break;
                case 1:
                    otherId = 0;
                    break;
            }

            if (otherId == 0) {
                $('.content').append('\
      <article class="animated fadeIn">\
        <div class="choice chosen">\
          <a id="button0" class="choice-no" onclick="buttonPress(\'' + data.choice[0].target + '\', 0)">' + data.choice[0].text + '</a>\
          <a id="button1" onclick="buttonPress(\'' + data.choice[1].target + '\', 1)">' + data.choice[1].text + '</a>\
        </div>\
      </article>\
    ');
            } else {
                $('.content').append('\
      <article class="animated fadeIn">\
        <div class="choice chosen">\
          <a id="button0" onclick="buttonPress(\'' + data.choice[0].target + '\', 0)">' + data.choice[0].text + '</a>\
          <a id="button1" class="choice-no" onclick="buttonPress(\'' + data.choice[1].target + '\', 1)">' + data.choice[1].text + '</a>\
        </div>\
      </article>\
    ');
            }

        }
    }
}

function addStatus(data, liveData) {
    $('.content').append('\
  <article class="animated fadeIn">\
    <div class="status">\
      * ' + data.text + ' *\
    </div>\
  </article>\
  ');

    if (liveData) {
        scrollToBottom();
        lockStory(data.unlock);
    }
}

function addEnd(liveData) {
    $('.content').append('\
    <article class="animated fadeIn">\
      <div class="end">\
        <a href="index.html">Return Home</a>\
      </div>\
    </article>\
  ');

    if (liveData) {
        scrollToBottom();
    }
}


// SAVE FUNCTIONS

function loadPath() {
    gamePath = JSON.parse(localStorage.getItem('storyPath'));
    console.log(gamePath);

    var lastID = null;

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

        lastID = id;
    });

    var lastData = getData(lastID);

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
