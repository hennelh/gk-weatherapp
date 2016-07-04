/* eslint-disable */ 
var Geo = {};
var openWeatherKey = '53f9d8e4213222cf517d86dc406d67fc';

$(document).ajaxStart(function () {
    $('div#loading').show();
});

$(document).ajaxComplete(function () {
    $('div#loading').hide();
});

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success,error);
}
else {
    alert('Geolocation is not supported');
}

function error() {
    alert('Weird. We couldn\'t find you!');
}

function getWeather(lat,lng) {
    var Weather = 'http://api.openweathermap.org/data/2.5/weather?lat=' 
                    + lat + '&lon=' + lng 
                    + '&units=metric' + '&APPID=' + openWeatherKey;
    
    $.ajax({
            url: Weather,
            dataType: "jsonp",
            success: function(data){
                console.log(data);
                $('#city').text(data.name);
                $('#temp').text(Math.round(data.main.temp));
                $('#description-image').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                $('#description').text(data.weather[0].description);
            },
            error: function(xhr,status,error){
                alert(error);
            }

        })
}

function success(position) {
    Geo.lat = position.coords.latitude;
    Geo.lng = position.coords.longitude;

    getWeather(Geo.lat, Geo.lng);
}

$('#refresh').click(function () {
    if(Geo.lat != null && Geo.lng != null) {
        getWeather(Geo.lat, Geo.lng);
    }
    else {
        alert('Can\'t find your location!');
    }
});
