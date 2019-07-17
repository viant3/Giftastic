var images = ["USMC", "Bulldogs", "Explosions", "Bruce Lee"];

function displayGiphyInfo() {

    var gif = $(this).attr("data-name");


    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NON2Fxa8mAT86b3Ru92GZ85PMuvTV93g&q=" + gif + "&limit=10&offset=0&lang=en";



    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var rating = response.data.rating;


            var results = response.data;
            console.log(results);

            var giphyContainer = $("<section class='giphy-container'>");

            for (var i = 0; i < results.length; i++) {
                var newDiv = $("<div class='display'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);


                var img = $("<img class='result'>");
                img.attr("src", results[i].images.fixed_height_still.url);
                img.attr("data-state", "still");
                img.attr("data-still", results[i].images.fixed_height_still.url);
                img.attr("data-animate", results[i].images.fixed_height.url);



                newDiv.prepend(p);
                newDiv.prepend(img);

                giphyContainer.prepend(newDiv)
               
            }
            $("#giphy-view").prepend(giphyContainer);
        });
}

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


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