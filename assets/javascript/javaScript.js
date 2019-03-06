$(document).ready(function () {
    var topics = ["labrador retrievers", "german shepherd", "french bulldogs", "golden retrievers", "rottweilers", "poodles", "bulldogs", "dachshunds"];

    function displayBreedGif() {
        var breed = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=zNBZZJ2RtFXneRDIDVhJ8CSDtHISleX4&limit=10";

        $("#gifSpot").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {

                var rating = response.data[i].rating;
                var gifUrl = response.data[i].images.fixed_height_still.url;
                var gifUrlAnimate = response.data[i].images.fixed_height.url;
                console.log(rating);
                console.log(gifUrl);
                console.log(gifUrlAnimate);


                var figure = $("<figure class='figure'>");

                var img = $("<img class='gifImg'>");
                img.attr("src", gifUrl);
                img.attr("alt", "dog gif");
                img.attr("data-state", "still")
                img.attr("data-still", gifUrl);
                img.attr("data-amimate", gifUrlAnimate);

                var caption = $("<figcaption class='figure-caption'>");

                caption.text("Rating: " + rating);

                figure.append(caption);
                figure.append(img);
                $("#gifSpot").prepend(figure);

                $(".gifImg").on("click", function () {

                    var state = $(this).attr("data-state");
                    console.log(state);

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            }
        });
    }


    function renderButtons() {
        $("#btnSpot").empty();


        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#btnSpot").append(a);
        }
    }

    $("#add-breed").on("click", function (event) {
        event.preventDefault();
        var breed = $("#breed-input").val().trim();
        topics.push(breed);
        renderButtons();
    })

    $(document).on("click", ".btn", displayBreedGif);

    renderButtons();

})

