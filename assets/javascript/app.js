var images = ["Bulldogs", "Nuclear Test", "Bruce Lee", "Blank Stare", "Aliens"];

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
      } 
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


function renderButtons() {
  
    $("#buttons-view").empty();

    for (var i = 0; i < images.length; i++) {
  
        var a = $("<button>");

        a.addClass("gif");
        a.attr("data-name", images[i]);
        a.text(images[i]);

        $("#buttons-view").append(a);
    }
}


$("#add-gif").on("click", function (event) {

    event.preventDefault();
    
    var gif = $("#giphy-input").val().trim();

    images.push(gif);


    renderButtons();
});

$(document).on("click", ".gif", displayGiphyInfo);

renderButtons();