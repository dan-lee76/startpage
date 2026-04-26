// ------------- GREETING -------------
var today = new Date();
var hrs = today.getHours();
var greet;
if (hrs >= 5 && hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs < 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs < 21)
    greet = 'Good Evening';
else
    greet = 'Good Night';
document.getElementById('greeting').textContent = greet + ', Dan.';

// ------------- DATE -------------
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
document.getElementById('date').textContent = today.getDate() + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();

document.ondragstart = function() { return false; };

// ------------- TIME -------------
function currentTime() {
    var now = new Date();
    var hour = String(now.getHours());
    var min = checkTime(now.getMinutes());
    var sec = checkTime(now.getSeconds());
    var timeEl = document.getElementById('time');
    timeEl.textContent = '';
    [hour, min, sec].forEach(function(part, i) {
        var span = document.createElement('span');
        span.textContent = part;
        timeEl.appendChild(span);
        if (i < 2) {
            var sep = document.createElement('span');
            sep.className = 'sep';
            sep.textContent = ':';
            timeEl.appendChild(sep);
        }
    });
    document.getElementById('title').textContent = hour + ':' + min + ' | StartPage';
    setTimeout(currentTime, 500);
}

function checkTime(i) {
    return i < 10 ? '0' + i : String(i);
}

