var GAME_DATA_JSON = [
    {
        "id": "End",
        "type": "end"
    },

    {
        "id": "Start",
        "type": "message",
        "message": "Oh no, oh no what's going on...",
        "target": "DeepBreath"
    },

    {
        "id": "DeepBreath",
        "type": "message",
        "message": "Okay now take a deep breath.",
        "target": "OkayOrTogether"
    },

    {
        "id": "OkayOrTogether",
        "type": "choice",
        "choice": [{
            "text": "Are you okay?",
            "target": "AreYouOkay"
        }, {
            "text": "Pull yourself together.",
            "target": "PullTogether"
        }]
    },

    {
        "id": "AreYouOkay",
        "type": "message",
        "message": "If you call crashing a plane 'okay', then yes, I'm doing just fine.",
        "target": "GenuineQuestionOrSmartArse"
    },

    {
        "id": "GenuineQuestionOrSmartArse",
        "type": "choice",
        "choice": [{
            "text": "It's a genuine question...",
            "target": "BesideTheLake"
        }, {
            "text": "No need to be a smart arse.",
            "target": "NotSmartArse"
        }]
    },

    {
        "id": "BesideTheLake",
        "type": "message",
        "message": "Well... I'm lying down beside the lake at the moment...",
        "target": "RoughSwim"
    },

    {
        "id": "NotSmartArse",
        "type": "message",
        "message": "I'd laugh but that would just hurt more.",
        "target": "TellWhatIsHappening"
    },

    {
        "id": "RoughSwim",
        "type": "message",
        "message": "The swim was rough to get here. Glad to be alive.",
        "target": "ShouldGetUp"
    },

    {
        "id": "PullTogether",
        "type": "message",
        "message": "It just hurts so much.",
        "target": "TellWhatIsHappening"
    },

    {
        "id": "TellWhatIsHappening",
        "type": "choice",
        "choice": [{
            "text": "Tell me what's happening.",
            "target": "BesideTheLake"
        }, {
            "text": "Pain is only in the mind.",
            "target": "ReallyThinkThat"
        }]
    },

    {
        "id": "ReallyThinkThat",
        "type": "message",
        "message": "You really think that?",
        "target": "PainYesOrNo"
    },

    {
        "id": "PainYesOrNo",
        "type": "choice",
        "choice": [{
            "text": "Yes, now tell me what is happening?",
            "target": "BesideTheLake"
        }, {
            "text": "No that's not true...",
            "target": "AnExplanation1"
        }]
    },

    {
        "id": "AnExplanation1",
        "type": "message",
        "message": "Thought not.",
        "target": "AnExplanation2"
    },

    {
        "id": "AnExplanation2",
        "type": "message",
        "message": "Okay well, the plane would be a complete write-off.",
        "target": "AnExplanation3"
    },

    {
        "id": "AnExplanation3",
        "type": "message",
        "message": "Better yet, I don't know where I am...",
        "target": "BesideTheLake"
    },

    {
        "id": "ShouldGetUp",
        "type": "message",
        "message": "I should get up. I swear there's bugs all over me.",
        "target": "CheckOrRest"
    },

    {
        "id": "CheckOrRest",
        "type": "choice",
        "choice": [{
            "text": "Better check your sorrundings.",
            "target": "TryGetUp"
        }, {
            "text": "Why don't you stay and tell me what happened?",
            "target": "ExplainWhatHappened1"
        }]
    },

    {
        "id": "TryGetUp",
        "type": "message",
        "message": "Okay, here goes...",
        "target": "FirstGetUp"
    },

    {
        "id": "FirstGetUp",
        "type": "status",
        "text": "Brian is busy...",
        "unlock": 10,
        "target": "GetUpFailed"
    },

    {
        "id": "GetUpFailed",
        "type": "message",
        "message": "That didn't work. Oh God, help me.",
        "target": "KeepTryingOrTakeTime"
    },

    {
        "id": "KeepTryingOrTakeTime",
        "type": "choice",
        "choice": [{
            "text": "Just keep trying!",
            "target": "KeepTryingToGetUp"
        }, {
            "text": "Better take some time for yourself.",
            "target": "ExplainLink"
        }]
    },

    {
        "id": "ExplainLink",
        "type": "message",
        "message": "Good idea. I guess you'll want to know how this mess started.",
        "target": "ExplainWhatHappened1"
    },

    {
        "id": "ExplainWhatHappened1",
        "type": "message",
        "message": "You see, I've been having some trouble with my parents.",
        "target": "ExplainWhatHappened2"
    },

    {
        "id": "ExplainWhatHappened2",
        "type": "message",
        "message": "I mean, I'm not the problem. But there's <em>The Secret</em>.",
        "target": "ExplainWhatHappened3"
    },

    {
        "id": "ExplainWhatHappened3",
        "type": "message",
        "message": "And it drove my family apart.",
        "target": "ExplainWhatHappened4"
    },

    {
        "id": "ExplainWhatHappened4",
        "type": "message",
        "message": "So, to see my dad now I have to fly to him.",
        "target": "ExplainWhatHappened5"
    },

    {
        "id": "ExplainWhatHappened5",
        "type": "message",
        "message": "And here I was, on the Cessna, staring at the vastness of forest.",
        "target": "ExplainWhatHappened6"
    },

    {
        "id": "ExplainWhatHappened6",
        "type": "message",
        "message": "That endless...endless forest.",
        "target": "ExplainWhatHappened7"
    },

    {
        "id": "ExplainWhatHappened7",
        "type": "message",
        "message": "And I look over, and here is Jake..? Jim..? The pilot anyway...",
        "target": "ExplainWhatHappened8"
    },

    {
        "id": "ExplainWhatHappened8",
        "type": "message",
        "message": "Having a heart attack.",
        "target": "ExplainWhatHappened9"
    },

    {
        "id": "ExplainWhatHappened9",
        "type": "message",
        "message": "A HEART ATTACK!",
        "target": "ExplainMoreOrGetUp"
    },

    {
        "id": "ExplainMoreOrGetUp",
        "type": "choice",
        "choice": [{
            "text": "Are you sure you're not delusional?",
            "target": "ExplainWhatHappened10"
        }, {
            "text": "Okay, okay, I get it. Now get up!",
            "target": "GetUpStrength"
        }]
    },

    {
        "id": "GetUpStrength",
        "type": "message",
        "message": "Good idea - let's hope I have a little more strength...",
        "target": "TryGetUpForMinute"
    },

    {
        "id": "ExplainWhatHappened10",
        "type": "message",
        "message": "I'm not.",
        "target": "ExplainWhatHappened11"
    },

    {
        "id": "ExplainWhatHappened11",
        "type": "message",
        "message": "But Jack, Jim, whatever, he let me fly for a bit before it all happened.",
        "target": "ExplainWhatHappened12"
    },

    {
        "id": "ExplainWhatHappened12",
        "type": "message",
        "message": "Which is lucky really, if you can call it luck, because who knew I'd be \"landing\" the hunk of scrap.",
        "target": "ExplainWhatHappened13"
    },

    {
        "id": "ExplainWhatHappened13",
        "type": "message",
        "message": "Enough talk now. I need to get up.",
        "target": "ExplainWhatHappened14"
    },

    {
        "id": "ExplainWhatHappened14",
        "type": "message",
        "message": "Whatever these bugs are, they're not friendly...",
        "target": "TryGetUpForMinute"
    },

    {
        "id": "KeepTryingToGetUp",
        "type": "message",
        "message": "I will. But please take it easy on me after.",
        "target": "TryGetUpForMinute"
    },

    {
        "id": "TryGetUpForMinute",
        "type": "status",
        "text": "Brian is busy...",
        "unlock": 60,
        "target": "OkayIAmUp"
    },

    {
        "id": "OkayIAmUp",
        "type": "message",
        "message": "Alright, I'm up.",
        "target": "UpBarely"
    },

    {
        "id": "UpBarely",
        "type": "message",
        "message": "Barely.",
        "target": "MosquitoesAreAggressive"
    },

    {
        "id": "MosquitoesAreAggressive",
        "type": "message",
        "message": "You know, mosquitoes are a lot more aggressive out here.",
        "target": "FeastOnEyes"
    },

    {
        "id": "FeastOnEyes",
        "type": "message",
        "message": "They seemed to feast on my eyes.",
        "target": "RealFun"
    },

    {
        "id": "RealFun",
        "type": "message",
        "message": "Real fun.",
        "target": "SoundsTerribleWhatCanYouSee"
    },

    {
        "id": "SoundsTerribleWhatCanYouSee",
        "type": "choice",
        "choice": [{
            "text": "Sounds Terrible...",
            "target": "AfraidOfSun"
        }, {
            "text": "What can you see?",
            "target": "WellSandyRidge"
        }]
    },

    {
        "id": "AfraidOfSun",
        "type": "message",
        "message": "Yes. Seems they've gone now. Afraid of the sun?",
        "target": "MaybeVampires"
    },

    {
        "id": "MaybeVampires",
        "type": "message",
        "message": "Maybe they're vampires...",
        "target": "DelusionalOrNoDoubt"
    },

    {
        "id": "DelusionalOrNoDoubt",
        "type": "choice",
        "choice": [{
            "text": "Does 'delusional' ring a bell?",
            "target": "ShutTheHellUp"
        }, {
            "text": "No doubt!",
            "target": "AhaKnewIt"
        }]
    },

    {
        "id": "ShutTheHellUp",
        "type": "message",
        "message": "Does 'Shut the hell up?' ring a bell?",
        "target": "NeedToFocus"
    },

    {
        "id": "NeedToFocus",
        "type": "message",
        "message": "Besides, I need to focus now.",
        "target": "FindOutWhereIAm"
    },

    {
        "id": "FindOutWhereIAm",
        "type": "message",
        "message": "Find out where I am...",
        "target": "Hmm1"
    },

    {
        "id": "Hmm1",
        "type": "message",
        "message": "Hmm...",
        "target": "WellSandyRidge"
    },

    {
        "id": "AhaKnewIt",
        "type": "message",
        "message": "Aha! Knew it.",
        "target": "LookingForSomeone"
    },

    {
        "id": "LookingForSomeone",
        "type": "message",
        "message": "I suppose I better start looking for someone.",
        "target": "OrSomething"
    },

    {
        "id": "OrSomething",
        "type": "message",
        "message": "...or something?",
        "target": "WellSandyRidge"
    },

    {
        "id": "WellSandyRidge",
        "type": "message",
        "message": "Well, there seems to be a sandy looking ridge...",
        "target": "AllSoGreen"
    },

    {
        "id": "AllSoGreen",
        "type": "message",
        "message": "And it's all so green!",
        "target": "MostlyEvergreens"
    },

    {
        "id": "MostlyEvergreens",
        "type": "message",
        "message": "Trees... Pines and spruce I think? Lots of bush as well...",
        "target": "EnoughAdmiration"
    },

    {
        "id": "EnoughAdmiration",
        "type": "message",
        "message": "Enough of the admiration of nature.",
        "target": "HelpOrSupplies"
    },

    {
        "id": "HelpOrSupplies",
        "type": "message",
        "message": "What should I do, call for help of find some supplies?",
        "target": "CallForHelpOrFindSupplies"
    },

    {
        "id": "CallForHelpOrFindSupplies",
        "type": "choice",
        "choice": [{
            "text": "Call for help.",
            "target": "CallForHelp"
        }, {
            "text": "Find supplies.",
            "target": "FindSupplies"
        }]
    },

    {
        "id": "CallForHelp",
        "type": "message",
        "message": "If you say so...",
        "target": "CallingForHelp"
    },

    {
        "id": "CallingForHelp",
        "type": "status",
        "text": "Brian calls for help...",
        "unlock": 120,
        "target": "NoLuckCalling"
    },

    {
        "id": "NoLuckCalling",
        "type": "message",
        "message": "No luck. I think that was anything but encouraging.",
        "target": "SunlightCommodity"
    },

    {
        "id": "SunlightCommodity",
        "type": "message",
        "message": "I think sunlight is going a small commodity soon too...",
        "target": 0000000000000000000000000000000000000000000
    },

    {
        "id": "FindSupplies",
        "type": "message",
        "message": "I agree. Good idea. But where? What do I get?",
        "target": "WhereForSupplies"
    },

    {
        "id": "WhereForSupplies",
        "type": "choice",
        "choice": [{
            "text": "Food? Fruit? Meat?",
            "target": "FoodOverFlint"
        }, {
            "text": "Wood? Flint?",
            "target": "FlintOverFood"
        }]
    },

    {
        "id": "FoodOverFlint",
        "type": "message",
        "message": "I might see if there's berries around here...",
        "target": "MagicalBerries"
    },

    {
        "id": "MagicalBerries",
        "type": "message",
        "message": "There's always magical berries in a forest.",
        "target": "SearchForBerries"
    },

    {
        "id": "SearchForBerries",
        "type": "status",
        "text": "Brian searches for berries...",
        "unlock": 90,
        "target": 0000000000000000000000000000000000000000000000000
    },

    {
        "id": "FlintOverFood",
        "type": "message",
        "message": "Right! Where do you find flint?",
        "target": "ShaleRockOrNotSure"
    },

    {
        "id": "ShaleRockOrNotSure",
        "type": "choice",
        "choice": [{
            "text": "Look for shale rock.",
            "target": "ShaleRockGotIt"
        }, {
            "text": "I'm not really sure...",
            "target": "YouAreUseful"
        }]
    },

    {
        "id": "ShaleRockGotIt",
        "type": "message",
        "message": "Shale rock. Got it.",
        "target": "LookForShaleRock"
    },

    {
        "id": "LookForShaleRock",
        "type": "status",
        "text": "Brian searches for shale rock...",
        "unlock": 90,
        "target": 000000000000000000000000000000000000000000000000000
    },

    {
        "id": "YouAreUseful",
        "type": "message",
        "message": "Well you're useful.",
        "target": "SomethingYouCanUseOrFood"
    },

    {
        "id": "SomethingYouCanUseOrFood",
        "type": "choice",
        "choice": [{
            "text": "Is there something else you can use?",
            "target": "NothingToUse"
        }, {
            "text": "Maybe look for food instead?",
            "target": "FoodIThinkYouShould"
        }]
    },

    {
        "id": "FoodIThinkYouShould",
        "type": "message",
        "message": "If you think I should...",
        "target": "FoodOverFlint"
    },

    {
        "id": "NothingToUse",
        "type": "message",
        "message": "I have nothing to use.",
        "target": "ThinkOrLook"
    },

    {
        "id": "ThinkOrLook",
        "type": "choice",
        "choice": [{
            "text": "Think about it for a second!",
            "target": "ThinkForASecond"
        }, {
            "text": "Look around again.",
            "target": "LookAroundAgain"
        }]
    },

    {
        "id": "ThinkForASecond",
        "type": "message",
        "message": "The hatchet. Of course the hatchet!",
        "target": "FindSomeTinder"
    },

    {
        "id": "LookAroundAgain",
        "type": "message",
        "message": "Yeah you're right. I'm stupid...",
        "target": "ThinkForASecond"
    },

    {
        "id": "FindSomeTinder",
        "type": "message",
        "message": "So... Do I find some tinder?",
        "target": "GatherTinderMightNotWork"
    },

    {
        "id": "GatherTinderMightNotWork",
        "type": "choice",
        "choice": [{
            "text": "Gather tinder.",
            "target": "GatherTinder"
        }, {
            "text": "That might not work...",
            "target": "MightNotWork"
        }]
    },

    {
        "id": "GatherTinder",
        "type": "message",
        "message": "Alright, I'll try find some now...",
        "target": "SearchForTinder"
    },

    {
        "id": "SearchForTinder",
        "type": "status",
        "text": "Brian searches for tinder...",
        "unlock": 90,
        "target": 0000000000000000000000000000000000000000000000000
    },

    {
        "id": "MightNotWork",
        "type": "message",
        "message": "Oh, why's that?",
        "target": "GoFindItMightBeTooWet"
    },

    {
        "id": "GoFindItMightBeTooWet",
        "type": "choice",
        "choice": [{
            "text": "Nevermind. Just go find it.",
            "target": "GatherTinder"
        }, {
            "text": "It might be too wet.",
            "target": "MightBeTooWet"
        }]
    },

    {
        "id": "MightBeTooWet",
        "type": "message",
        "message": "Too wet?",
        "target": "OhTooWet"
    },

    {
        "id": "OhTooWet",
        "type": "message",
        "message": "Oh, it might not burn...",
        "target": "FindDeadWood"
    },

    {
        "id": "FindDeadWood",
        "type": "message",
        "message": "I'll try find some dead wood then?",
        "target": "DeadWoodOrAndStone"
    },

    {
        "id": "DeadWoodOrAndStone",
        "type": "choice",
        "choice": [{
            "text": "Sounds like a plan.",
            "target": "GetDeadWood"
        }, {
            "text": "Grab some stone too!",
            "target": "FindWoodAndStone"
        }]
    },

    {
        "id": "GetDeadWood",
        "type": "message",
        "message": "Okay dead wood in lush forest, this'll be cake...",
        "target": "MmmCake"
    },

    {
        "id": "MmmCake",
        "type": "message",
        "message": "Mmm... Cake...",
        "target": "FindSomeDeadWood"
    },

    {
        "id": "FindSomeDeadWood",
        "type": "status",
        "text": "Brian searches for dead wood...",
        "unlock": 90,
        "target": 0000000000000000000000000000000000000000000000000
    },

    {
        "id": "FindWoodAndStone",
        "type": "message",
        "message": "Some stone?",
        "target": "SparksOrWood"
    },

    {
        "id": "SparksOrWood",
        "type": "choice",
        "choice": [{
            "text": "Stone + Hatchet = ?",
            "target": "SparksYes"
        }, {
            "text": "Nevermind, just find wood.",
            "target": "GetDeadWood"
        }]
    },

    {
        "id": "SparksYes",
        "type": "message",
        "message": "Sparks! Of course! I'll get right on that.",
        "target": "SearchForWoodAndStone"
    },

    {
        "id": "SearchForWoodAndStone",
        "type": "status",
        "text": "Brian searches for dead wood and stone...",
        "unlock": 90,
        "target": 0000000000000000000000000000000000000000000000000
    }
];
