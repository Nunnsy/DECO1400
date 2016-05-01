var gamePath = [];

// Types of data: message, decision, status(unlock is in minutes)
var GAME_DATA_JSON = [
    {
        'id': 'End',
        'type': 'end'
    },

    {
        'id': 'Start',
        'type': 'message',
        'message': 'Oh no, oh no what\'s going on...',
        'target': 'DeepBreath'
    },

    {
        'id': 'DeepBreath',
        'type': 'message',
        'message': 'Okay now take a deep breath.',
        'target': 'OkayOrTogether'
    },

    {
        'id': 'OkayOrTogether',
        'type': 'choice',
        'choice': [{
            'text': 'Are you okay?',
            'target': 'AreYouOkay'
        }, {
            'text': 'Pull yourself together.',
            'target': 'PullTogether'
        }]
    },

    {
        'id': 'AreYouOkay',
        'type': 'message',
        'message': 'If you call crashing a plane "okay", then yes, I\'m doing just fine.',
        'target': 'GenuineQuestionOrSmartArse'
    },

    {
        'id': 'GenuineQuestionOrSmartArse',
        'type': 'choice',
        'choice': [{
            'text': 'It\'s a genuine question...',
            'target': 'BesideTheLake'
        }, {
            'text': 'No need to be a smart arse.',
            'target': 'NotSmartArse'
        }]
    },

    {
        'id': 'BesideTheLake',
        'type': 'message',
        'message': 'Well... I\'m lying down beside the lake at the moment...',
        'target': 'RoughSwim'
    },

    {
        'id': 'NotSmartArse',
        'type': 'message',
        'message': 'I\'d laugh but that would just hurt more.',
        'target': 'TellWhatIsHappening'
    },

    {
        'id': 'RoughSwim',
        'type': 'message',
        'message': 'The swim was rough to get here. Glad to be alive.',
        'target': 'ShouldGetUp'
    },

    {
        'id': 'PullTogether',
        'type': 'message',
        'message': 'It just hurts so much',
        'target': 'TellWhatIsHappening'
    },

    {
        'id': 'TellWhatIsHappening',
        'type': 'choice',
        'choice': [{
            'text': 'Tell me what\'s happening.',
            'target': 'BesideTheLake'
        }, {
            'text': 'Pain is only in the mind.',
            'target': 'ReallyThinkThat'
        }]
    },

    {
        'id': 'ReallyThinkThat',
        'type': 'message',
        'message': 'You really think that?',
        'target': 'PainYesOrNo'
    },

    {
        'id': 'PainYesOrNo',
        'type': 'choice',
        'choice': [{
            'text': 'Yes, now tell me what is happening?',
            'target': 'BesideTheLake'
        }, {
            'text': 'No that\'s not true...',
            'target': 'AnExplanation1'
        }]
    },

    {
        'id': 'AnExplanation1',
        'type': 'message',
        'message': 'Thought not.',
        'target': 'AnExplanation2'
    },

    {
        'id': 'AnExplanation2',
        'type': 'message',
        'message': 'Okay well, the plane would be a complete write-off.',
        'target': 'AnExplanation3'
    },

    {
        'id': 'AnExplanation3',
        'type': 'message',
        'message': 'Better yet, I don\'t know where I am...',
        'target': 'BesideTheLake'
    },

    {
        'id': 'ShouldGetUp',
        'type': 'message',
        'message': 'I should get up. I swear there\'s bugs all over me.',
        'target': 'CheckOrRest'
    },

    {
        'id': 'CheckOrRest',
        'type': 'choice',
        'choice': [{
            'text': 'Better check your sorrundings.',
            'target': 'TryGetUp'
        }, {
            'text': 'Why don\'t you stay and tell me what happened?',
            'target': 'ExplainWhatHappened1'
        }]
    },

    {
        'id': 'TryGetUp',
        'type': 'message',
        'message': 'Okay, here goes...',
        'target': 'FirstGetUp'
    },

    {
        'id': 'FirstGetUp',
        'type': 'status',
        'text': 'Brian is busy...',
        'unlock': 10,
        'target': 'GetUpFailed'
    },

    {
        'id': 'GetUpFailed',
        'type': 'message',
        'message': 'That didn\'t work. Oh God, help me.',
        'target': 'KeepTryingOrTakeTime'
    },

    {
        'id': 'KeepTryingOrTakeTime',
        'type': 'choice',
        'choice': [{
            'text': 'Just keep trying!',
            'target': 'KeepTryingToGetUp'
        }, {
            'text': 'Better take some time for yourself.',
            'target': 'ExplainLink'
        }]
    },

    {
        'id': 'ExplainLink',
        'type': 'message',
        'message': 'Good idea. I guess you\'ll want to know how this mess started.',
        'target': 'ExplainWhatHappened1'
    },

    {
        'id': 'ExplainWhatHappened1',
        'type': 'message',
        'message': 'You see, I\'ve been having some trouble with my parents.',
        'target': 'ExplainWhatHappened2'
    },

    {
        'id': 'ExplainWhatHappened2',
        'type': 'message',
        'message': 'I mean, I\'m not the problem. But there\'s <em>The Secret</em>.',
        'target': 'ExplainWhatHappened3'
    },

    {
        'id': 'ExplainWhatHappened3',
        'type': 'message',
        'message': 'And it drove my family apart.',
        'target': 'ExplainWhatHappened4'
    },

    {
        'id': 'ExplainWhatHappened4',
        'type': 'message',
        'message': 'So, to see my dad now I have to fly to him.',
        'target': 'ExplainWhatHappened5'
    },

    {
        'id': 'ExplainWhatHappened5',
        'type': 'message',
        'message': 'And here I was, on the Cessna, staring at the vastness of forest.',
        'target': 'ExplainWhatHappened6'
    },

    {
        'id': 'ExplainWhatHappened6',
        'type': 'message',
        'message': 'That endless...endless forest.',
        'target': 'ExplainWhatHappened7'
    },

    {
        'id': 'ExplainWhatHappened7',
        'type': 'message',
        'message': 'And I look over, and here is Jake..? Jim..? The pilot anyway...',
        'target': 'ExplainWhatHappened8'
    },

    {
        'id': 'ExplainWhatHappened8',
        'type': 'message',
        'message': 'Having a heart attack.',
        'target': 'ExplainWhatHappened9'
    },

    {
        'id': 'ExplainWhatHappened9',
        'type': 'message',
        'message': 'A HEART ATTACK!',
        'target': 'ExplainMoreOrGetUp'
    },

    {
        'id': 'ExplainMoreOrGetUp',
        'type': 'choice',
        'choice': [{
            'text': 'Are you sure you\'re not delusional?',
            'target': 'ExplainWhatHappened10'
        }, {
            'text': 'Okay, okay, I get it. Now get up!',
            'target': 'GetUpStrength'
        }]
    },

    {
        'id': 'GetUpStrength',
        'type': 'message',
        'message': 'Good idea - let\'s hope I have a little more strength...',
        'target': 'TryGetUpForMinute'
    },

    {
        'id': 'ExplainWhatHappened10',
        'type': 'message',
        'message': 'I\'m not.',
        'target': 'ExplainWhatHappened11'
    },

    {
        'id': 'ExplainWhatHappened11',
        'type': 'message',
        'message': 'But Jack, Jim, whatever, he let me fly for a bit before it all happened.',
        'target': 'ExplainWhatHappened12'
    },

    {
        'id': 'ExplainWhatHappened12',
        'type': 'message',
        'message': 'Which is lucky really, if you can call it luck, because who knew I\'d be "landing" the hunk of scrap.',
        'target': 'ExplainWhatHappened13'
    },

    {
        'id': 'ExplainWhatHappened13',
        'type': 'message',
        'message': 'Enough talk now. I need to get up.',
        'target': 'ExplainWhatHappened14'
    },

    {
        'id': 'ExplainWhatHappened14',
        'type': 'message',
        'message': 'Whatever these bugs are, they\'re not friendly...',
        'target': 'TryGetUpForMinute'
    },

    {
        'id': 'KeepTryingToGetUp',
        'type': 'message',
        'message': 'I will. But please take it easy on me after.',
        'target': 'TryGetUpForMinute'
    },

    {
        'id': 'TryGetUpForMinute',
        'type': 'status',
        'text': 'Brian is busy...',
        'unlock': 60,
        'target': 'OkayIAmUp'
    },

    {
        'id': 'OkayIAmUp',
        'type': 'message',
        'message': 'Alright, I\'m up.',
        'target': 'UpBarely'
    },

    {
        'id': 'UpBarely',
        'type': 'message',
        'message': 'Barely.',
        'target': 'MosquitoesAreAggressive'
    },

    {
        'id': 'MosquitoesAreAggressive',
        'type': 'message',
        'message': 'You know, mosquitoes are a lot more aggressive out here.',
        'target': 'FeastOnEyes'
    },

    {
        'id': 'FeastOnEyes',
        'type': 'message',
        'message': 'They seemed to feast on my eyes.',
        'target': 'RealFun'
    },

    {
        'id': 'RealFun',
        'type': 'message',
        'message': 'Real fun.',
        'target': 'SoundsTerribleWhatCanYouSee'
    },

    {
        'id': 'SoundsTerribleWhatCanYouSee',
        'type': 'choice',
        'choice': [{
            'text': 'Sounds Terrible...',
            'target': 'ExplainWhatHappened10'
        }, {
            'text': 'What can you see?',
            'target': 'GetUpStrength'
        }]
    }
];

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
