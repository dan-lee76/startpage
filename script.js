// ------------- GREETING ------------- 
var today = new Date();
var hrs = today.getHours();
var greet;
if (hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 20)
    greet = 'Good Evening';
else if (hrs >= 21 && hrs <= 24)
    greet = 'Good Night';
document.getElementById('greeting').innerHTML =greet + ", Dan."

// ------------- DATE ------------- 
var month = today.getMonth();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('date').innerHTML ="Today is " + today.getDate() +" " +monthNames[today.getMonth()]+"."

document.ondragstart = function() {
    return false;
};
// ------------- TIME ------------- 
function currentTime() {
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var seconds = today.getSeconds();
    const element = document.querySelector('#time');
    m = checkTime(min);
    s = checkTime(seconds);
    document.getElementById('time').innerHTML = hour + "<span style='color:#63AFD0;'>:</span>" + m + "<span style='color:#63AFD0;'>:</span>" + s;
    document.getElementById("title").innerHTML = hour + ":" + m + " | StartPage"
    var t = setTimeout(currentTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}
// ------------- WEATHER ------------- 
var IPlocation = "https://geo.ipify.org/api/v1?apiKey=at_FVI4Fkx3HauSCgbmx5ffZq3TN1jcs";
            
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
              document.getElementById("weather-desc").innerHTML = myObj.weather[0].description;
              document.getElementById("weather-temp").innerHTML = myObj.main.temp;
              document.getElementById("weather-loca-name").innerHTML = myObj.name;
              document.getElementById("weather-pres").innerHTML = myObj.main.pressure;
              document.getElementById("weather-hum").innerHTML = myObj.main.humidity;
              document.getElementById("weather-win-spe").innerHTML = myObj.wind.speed;
              document.getElementById("weather-win-deg").innerHTML = myObj.wind.deg;
              document.getElementById("weather-sts-country").innerHTML = myObj.sys.country;


          }
        };


        xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=wisbech&units=metric&appid=1097e7790d09472fcbbc6b813f92b183", true);
        xmlhttp.send();
