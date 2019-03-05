
var topics = ["labrador retrievers", "german shepherd", "french bulldogs", "golden retrievers", "rottweilers", "poodles", "bulldogs", "dachshunds"];

function displayBreedGif() {
    var breed = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=zNBZZJ2RtFXneRDIDVhJ8CSDtHISleX4&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET" 
    }).then(function(response){
        console.log(response);
        
        for (var i = 0; i < response.data.length; i++) {
            //var rating = response.data[i].rating; 

            var gifUrl = response.data[i].images.fixed_height_still.url; 
            
            //var rateText = $("<p>");
           // rateText.html("Rating: " + rating);

            var gifStill = $("<img>");
            gifStill.attr("src", gifUrl);
            gifStill.attr("alt", "dog gif");
           
            $("#gifSpot").append(gifStill);
        }
    });
}


function renderButtons() {
    $("#btnSpot").empty();
    

    for (var i = 0; i < topics.length; i++){
        var a = $("<button>");
        a.addClass("btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#btnSpot").append(a);
    }
}

$("#add-breed").on("click", function(event) {
    event.preventDefault();
    var breed = $("#breed-input").val().trim();
    topics.push(breed);
    renderButtons();
})

$(document).on("click", ".btn", displayBreedGif);

renderButtons();




