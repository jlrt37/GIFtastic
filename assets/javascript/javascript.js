$( document ).ready(function() {
var genres = ["Hip-Hop", "Rock", "Country", "Classical", "Rap", "Ska", "Reggae", "Heavy Metal","Punk", "Gospel", "R&B", "Techno"];
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < genres.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("genre");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", genres[i]);
        gifButton.text(genres[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
function addNewButton(){
    $("#addGif").on("click", function(){
    var genre = $("#genre-input").val().trim();
    if (genre == ""){
      return false;
    }
    genres.push(genre);

    displayGifButtons();
    return false;
    });
}
function removeLastButton(){
    $("removeGif").on("click", function(){
    genres.pop(genre);
    displayGifButtons();
    return false;
    });
}
function displayGifs(){
    var genre = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + genre + "&api_key=jQqPBqcuN6BVPuNTnx4ELmgJnPPXLuY6&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
}
displayGifButtons();
addNewButton();
removeLastButton();
$(document).on("click", ".genre", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});