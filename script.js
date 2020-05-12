// Greating 
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
    greet = 'Goodnight';
document.getElementById('greeting').innerHTML ='<b>' + greet + ", Dan."

//date
var month = today.getMonth();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById('date').innerHTML ="Today is " + today.getDate() +" " +monthNames[today.getMonth()]+"."

function currentTime() {
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var seconds = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    //document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}