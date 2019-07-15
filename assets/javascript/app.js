var images = ["Marine Corps", "Bulldogs", "Explosions", "Bruce Lee"];

// displayGiphyInfo function re-renders the HTML to display the appropriate content
function displayGiphyInfo() {

    var gif = $(this).attr("data-name");
   
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NON2Fxa8mAT86b3Ru92GZ85PMuvTV93g&q=" + gif + "&limit=10&offset=0&lang=en";

d
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var rating = response.data.rating;
            var imgSrc = response.data.images;

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var newDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var img = $("<img>");
                img.attr("src", results[i].images.fixed_height.url);

                newDiv.prepend(p);
                newDiv.prepend(img);

                $("#giphy-view").prepend(newDiv);
            }

        });

}

// Function for displaying gif data
function renderButtons() {

    // Deletes the images prior to adding new images
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of images
    for (var i = 0; i < images.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of gif to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", images[i]);
        // Provided the initial button text
        a.text(images[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#giphy-input").val().trim();

    // The gif from the textbox is then added to our array
    images.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();