// When the document is ready, execute the following code.
$(document).ready(function() {
  // Find the form on the page and add a 'Submit' listener.
    $("#newFeedbackForm").submit(function(event) {
        var complete = false;

        // If all inputs are filled, the form is complete.
        if ($("#feedbackName").val() != "" && $("#feedbackMessage").val() != "") {
            complete = true;
        }

        if (complete) {
            // Grabs a feedback article and clones it from the HTML so we don't create one from scratch.
            var newFeedback = $("article:last-of-type").clone();

            // Gets the values from the form.
            var name = $("#feedbackName").val();
            var feedback = $("#feedbackMessage").val();

            // Replace the cloned text with the form specific values.
            newFeedback.find(".user-name").text(name);
            newFeedback.find(".user-date").text(getTodayAsString());
            newFeedback.find(".user-feedback").text(feedback);

            // Add the new feedback to the page. (reverse chronological order)
            $("form").parent().after(newFeedback);

            // Animate the form's exit.
            $("form").parent().slideUp("slow");
        } else {
            // Check to see which inputs are filled and highlight the label if not filled.
            // We also check if they've corrected an input but not another and remove the error highlighting.
            if ($("#feedbackName").val() == "") {
                $("#feedbackName").prev().addClass("error");
            } else {
              if ($("#feedbackName").prev().hasClass("error")) {
                $("#feedbackName").prev().removeClass("error");
              }
            }

            if ($("#feedbackMessage").val() == "") {
                $("#feedbackMessage").prev().addClass("error");
            } else {
              if ($("#feedbackMessage").prev().hasClass("error")) {
                $("#feedbackMessage").prev().removeClass("error");
              }
            }
        }

        // Prevent the default action of the form. (As none is explicitly set in the HTML, this would be a refresh)
        event.preventDefault();
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
