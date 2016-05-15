$(document).ready(function() {
    $("#newFeedbackForm").submit(function(event) {
        var complete = false;

        if ($("#feedbackName").val() != "" && $("#feedbackMessage").val() != "") {
            complete = true;
        }

        if (complete) {
            var newFeedback = $("article:last-of-type").clone();
            var name = $("#feedbackName").val();
            var feedback = $("#feedbackMessage").val();

            newFeedback.find(".user-name").text(name);
            newFeedback.find(".user-date").text(getTodayAsString());
            newFeedback.find(".user-feedback").text(feedback);

            $("form").parent().after(newFeedback);

            $("form").parent().slideUp("slow");
        } else {
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

        event.preventDefault();
    });
});

function getTodayAsString() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0, go figure...
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    return dd + "/" + mm + "/" + yyyy;
}
