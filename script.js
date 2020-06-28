
$(document).ready(function() {

    if ($(window).width() < 768) {
        $("#search-city").attr("placeholder", "Search forecast for...");
    }

    $("#submit").click(function() {
        
        const city_searched = $("#search-city").val();

        $(".temp").empty();

        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city_searched + "&units=imperial&appid=ac3259094185ee5c45e5f150ed1a9c5d",
            success: function(data) {
            
                console.log(data);

                //$(".current-weather").wrap("<a href='forecast.html'></a>");
                $(".current-weather").css({"color": "black", "text-decoration": "none"});

                const city = data.name;
                $(".city").html(city);

                const icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
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
                $(".wind-speed").html("Wind Speed: " + wind_speed + "mph");

                $(".current-weather").click(function() {

                    document.location.href = "forecast.html";
                    
                    $(document).ready(function() {
                        
                        $.ajax({
                            type: "GET",
                            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city_searched + "&units=imperial&appid=ac3259094185ee5c45e5f150ed1a9c5d",
                            success: function(data) {
            
                                console.log(data);
                
                                $.each(data.list, function(index) {
                                    $(".city").append(data.list[index].main.temp);
                                });
                            },
                            statusCode: {
                                404: function() {
                                    console.log("ERRR");
                                }
                            }
                        });
                    });
                });
            },
            statusCode: {
                400: function() {

                    $(".temp").html("No location was entered. Please enter a location.");
                    $(".icon").removeAttr("src");
                    $(".weather").empty();
                    $(".city").empty();
                    $(".real-feel").empty();
                    $(".humidity").empty();
                    $(".wind-speed").empty();
                },
                401: function() {

                    $(".temp").html("An error occured while accessing this resource.");
                    $(".icon").removeAttr("src");
                    $(".weather").empty();
                    $(".city").empty();
                    $(".real-feel").empty();
                    $(".humidity").empty();
                    $(".wind-speed").empty();
                },
                404: function() {

                    $(".temp").html("No location was found with name '" + city_searched + "'. Remember to check that your location is formatted and spelled correctly.");
                    $(".icon").removeAttr("src");
                    $(".weather").empty();
                    $(".city").empty();
                    $(".real-feel").empty();
                    $(".humidity").empty();
                    $(".wind-speed").empty();
                },
                429: function() {

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

    $("#search-city").keypress(function(event) {
        
        if (event.code === "Enter") {
            
            $("#submit").click();
        }
    });
});
