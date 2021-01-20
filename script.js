// Written by: Gavin Cernek, 7/15/2020

$(document).ready(() => {       // Once the document is ready to be displayed,

    if ($(window).width() < 768) {      // Adjusts search bar text for smaller screens
        
        $("#search-city").attr("placeholder", "Search forecast for...");
    };

    $("#submit").click(() => {      // When search button is clicked,
        
        const city_searched = $("#search-city").val();      // Retrieves the search value

        $.ajax({            // Initiate HTTP GET request to the OpenWeather API
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city_searched + "&units=imperial&appid=ac3259094185ee5c45e5f150ed1a9c5d",
            success: (data) => {        // If success,

                const city = data.name + ", " + data.sys.country;       // Store response data and fill the containers
                $(".city").html(city);

                const icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";        // Adding the icon to the container
                $(".icon").attr("src", icon);

                const weather = data.weather[0].main;
                $(".weather").html(weather);

                const temp = Math.floor(data.main.temp);
                $(".temp").html("Temperature: " + temp + " &deg" + "F");

                const real_feel = Math.floor(data.main.feels_like);
                $(".real-feel").html("Real Feel: " + real_feel + " &deg" + "F");

                const humidity = data.main.humidity;
                $(".humidity").html("Humidity: " + humidity + "%");

                const wind_speed = data.wind.speed;
                $(".wind-speed").html("Wind Speed: " + wind_speed + " mph");
            },
            statusCode: {           // If error code,
                400: () => {        // No loaction was entered

                    $(".temp").html("No location was entered. Please enter a location.");
                    $(".icon").removeAttr("src");
                    $(".weather").empty();
                    $(".city").empty();
                    $(".real-feel").empty();
                    $(".humidity").empty();
                    $(".wind-speed").empty();
                },
                404: () => {        // No location with the search query was found
                    
                    $(".temp").html("No location was found with name '" + city_searched + "'. Remember to check that your location is formatted and spelled correctly.");
                    $(".icon").removeAttr("src");
                    $(".weather").empty();
                    $(".city").empty();
                    $(".real-feel").empty();
                    $(".humidity").empty();
                    $(".wind-speed").empty();
                },
                429: () => {        // Ran out of API calls

                    $(".temp").html("Too many API calls have been made. Please wait for the calls to refresh.");
                    $(".icon").removeAttr("src");
                    $(".weather").empty();
                    $(".city").empty();
                    $(".real-feel").empty();
                    $(".humidity").empty();
                    $(".wind-speed").empty();
                }
            }
        });
    });

    $("#search-city").keypress((event) => {     // Allows user to press Enter key to simulate a click on the search button
        
        if (event.code === "Enter") {
            
            $("#submit").click();
        }
    });
});
