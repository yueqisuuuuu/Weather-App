var city = document.getElementById("city");
var weather = document.getElementById("weather");
var temp = document.getElementById("temp");
var unit = document.getElementById("unit");
var min_max = document.getElementById("min_max");
//var other = document.getElementById("other");
var lat, long, temp_c, temp_f, min_c, min_f, max_c, max_f;

/*
 * Call getLocation() and return current time and date onload
 */
window.onload = function(){
  getLocation();
  var date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleString();
}

/*
 * function getLocation()
 *
 * Get latitude and longitude location of user, return error message if geolocation function not supported by current browser
 *
 */
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      getWeather(long, lat);
      });
    } 
   else { 
        weather.innerHTML = "Geolocation is not supported by this browser.";
    }
}

/*
 * function changeTemp()
 *
 * Toggle current and min/max temperature between Celsius and Fahrenheit after any temperature has been clicked
 *
 */
function changeTemp(){
  if (temp.innerHTML == temp_c){
    temp.innerHTML = temp_f;
    unit.innerHTML = "&#8457";
    min_max.innerHTML = "High: " + max_f + "&#8457 &nbsp;&nbsp;&nbsp;&nbsp; Low: " + min_f + "&#8457";
  }
  else{
    temp.innerHTML = temp_c;
    unit.innerHTML = "&#8451";
    min_max.innerHTML = "High: " + max_c + "&#8451 &nbsp;&nbsp;&nbsp;&nbsp; Low: " + min_c + "&#8451";
  }
}

/*
 * function tempConvert(temp)
 *
 * Convert (and round) temperature from Celsius to Fahrenheit
 *
 */
function tempConvert(temp){
  return Math.round(((temp * 9)/5) + 32);
}

/*
 * function getWeather(long, lat)
 *
 * Send API request to fcc-weather for current weather at specific longitude and latitude, return city, temperature, weather, humidity and wind speed to #display
 *
 */
function getWeather(long, lat){
  var request = "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat;
  $.getJSON(request, function(location){
    //handle JSON data
    city.innerHTML = location.name + ", " + location.sys.country;
    weather.innerHTML = location.weather[0].main + "<img src=" + location.weather[0].icon + " />";
    //other.innerHTML = "Humidity: " + location.main.humidity + "% <br/>Wind: " + location.wind.speed + " mph";
    min_c = Math.round(location.main.temp_min);
    max_c = Math.round(location.main.temp_max);
    min_max.innerHTML = "High: " + max_c + "&#8451 &nbsp;&nbsp;&nbsp;&nbsp; Low: " + min_c + "&#8451";
    min_f = tempConvert(min_c);
    max_f = tempConvert(max_c);
    temp_c = Math.round(location.main.temp);
    temp_f = tempConvert(temp_c);
    temp.innerHTML = temp_c;
    unit.innerHTML = "&#8451";
  });
}
