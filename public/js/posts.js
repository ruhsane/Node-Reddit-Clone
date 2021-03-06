$(document).ready(function () {
    $(".vote-up").submit(function(e) {
        e.preventDefault();

        var postId = $(this).data("id");
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-up",
            success: function(date) {
                console.log("voted up!");
            },
            error: function(err) {
                console.log(err.message);
            }
        });
    });

    $(".vote-down").submit(function(e) {
        e.preventDefault();

        var postId = $(this).data("id");
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-down",
            success: function(data) {
                console.log("voted down!");
            },
            error: function(err) {
                consolo.log(err.message);
            }
        });
    });

});
