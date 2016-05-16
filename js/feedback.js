// When the document is ready, execute the following code.
$(document).ready(function() {

    // Declare the form objects for use throughout code.
    var feedbackNameObject = $("#feedbackName");
    var feedbackMessageObject = $("#feedbackMessage");

    // Find the form on the page and add a 'Submit' listener.
    $("#newFeedbackForm").submit(function(event) {
        var complete = false;

        // Get the ossociated values within the inputs.
        var name = feedbackNameObject.val();
        var message = feedbackMessageObject.val();

        // If all inputs are filled, the form is complete.
        if (name != "" && message != "") {
            complete = true;
        }

        // If the form is completed...
        if (complete) {
            // Grabs a feedback article and clones it from the HTML so we don't create one from scratch.
            var newFeedback = $("article:last-of-type").clone();

            // Replace the cloned text with the form specific values.
            newFeedback.find(".user-name").text(name);
            newFeedback.find(".user-date").text(getTodayAsString());
            newFeedback.find(".user-feedback").text(message);

            // Add the new feedback to the page. (reverse chronological order)
            $("form").parent().after(newFeedback);

            // Animate the form's exit.
            $("form").parent().slideUp(1000);

            // Animate the feedback entrance.
            // Display none must be added to start the element in the 'slid up' position.
            newFeedback.css("display", "none");
            newFeedback.slideDown(1000);
        } else {
            // Method in here incase they immediately try to submit without touching the form to trigger a blur event.
            if (name == "") {
                feedbackNameObject.prev().addClass("error");
            }

            if (message == "") {
                feedbackMessageObject.prev().addClass("error");
            }
        }

        // Prevent the default action of the form. (As none is explicitly set in the HTML, this would be a refresh)
        event.preventDefault();
    });

    // Check to see which inputs are filled and highlight the label if not filled.
    // We also check if they've corrected an input but not another and remove the error highlighting.
    $(feedbackNameObject).add(feedbackMessageObject).blur(function() {
        if ($(this).val() == "") {
            $(this).prev().addClass("error");
        } else {
            if ($(this).prev().hasClass("error")) {
                $(this).prev().removeClass("error");
            }
        }
    });
});

// Returns the date in DD/MM/YYYY format.
function getTodayAsString() {
    // Gets today's date.
    var today = new Date();

    // Gets date component values.
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0, go figure...
    var yyyy = today.getFullYear();

    // Add a "0" in front if the day is only one digit long.
    if (dd < 10) {
        dd = "0" + dd;
    }

    // Similar to above, only with the month now.
    if (mm < 10) {
        mm = "0" + mm;
    }

    // Returns the components in the required format.
    return dd + "/" + mm + "/" + yyyy;
}
