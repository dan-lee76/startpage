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

document.ondragstart = function () { return false; };

// ------------- TIME -------------
function currentTime() {
    var now = new Date();
    var hour = String(now.getHours());
    var min = checkTime(now.getMinutes());
    var sec = checkTime(now.getSeconds());
    var timeEl = document.getElementById('time');
    
    // Check if the DOM elements exist, if not create them
    if (timeEl.children.length === 0) {
        timeEl.innerHTML = '';
        ['h', 'sep1', 'm', 'sep2', 's'].forEach(id => {
            let span = document.createElement('span');
            if (id.startsWith('sep')) {
                span.className = 'sep';
                span.textContent = ':';
            } else {
                span.id = 'time-' + id;
            }
            timeEl.appendChild(span);
        });
    }
    
    // Update text content only
    document.getElementById('time-h').textContent = hour;
    document.getElementById('time-m').textContent = min;
    document.getElementById('time-s').textContent = sec;
    
    document.getElementById('title').textContent = hour + ':' + min + ' | StartPage';
    setTimeout(currentTime, 500);
}

function checkTime(i) {
    return i < 10 ? '0' + i : String(i);
}

// ------------- WEATHER -------------
async function fetchWeather() {
    try {
        let lat = 52.9548; // Nottingham fallback
        let lon = -1.1581;
        let locName = "Nottingham";

        try {
            const locRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
            if (locRes.ok) {
                const locData = await locRes.json();
                lat = locData.latitude;
                lon = locData.longitude;
                locName = locData.city || locData.region || "Local";
            }
        } catch (e) {
            console.warn("Location fetch failed, using fallback.", e);
        }

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
        if (!weatherRes.ok) throw new Error("Weather fetch failed");
        const weatherData = await weatherRes.json();

        const temp = Math.round(weatherData.current.temperature_2m);
        const code = weatherData.current.weather_code;

        updateWeatherUI(temp, code, locName);
        document.getElementById('weather').style.display = 'flex';
    } catch (e) {
        console.error("Failed to fetch weather", e);
        document.getElementById('weather').style.display = 'none';
    }
}

function updateWeatherUI(temp, code, locName) {
    const weatherIcons = {
        0: { desc: 'Clear sky', icon: '☀️', colors: ['rgba(250, 204, 21, 0.18)', 'rgba(251, 146, 60, 0.15)', 'rgba(56, 189, 248, 0.1)'] },
        1: { desc: 'Mainly clear', icon: '🌤️', colors: ['rgba(250, 204, 21, 0.15)', 'rgba(125, 211, 252, 0.15)', 'rgba(56, 189, 248, 0.1)'] },
        2: { desc: 'Partly cloudy', icon: '⛅', colors: ['rgba(148, 163, 184, 0.18)', 'rgba(125, 211, 252, 0.15)', 'rgba(56, 189, 248, 0.1)'] },
        3: { desc: 'Overcast', icon: '☁️', colors: ['rgba(100, 116, 139, 0.25)', 'rgba(148, 163, 184, 0.2)', 'rgba(71, 85, 105, 0.15)'] },
        45: { desc: 'Fog', icon: '🌫️', colors: ['rgba(148, 163, 184, 0.2)', 'rgba(100, 116, 139, 0.2)', 'rgba(203, 213, 225, 0.15)'] },
        48: { desc: 'Depositing rime fog', icon: '🌫️', colors: ['rgba(148, 163, 184, 0.2)', 'rgba(100, 116, 139, 0.2)', 'rgba(203, 213, 225, 0.15)'] },
        51: { desc: 'Light drizzle', icon: '🌧️', colors: ['rgba(56, 189, 248, 0.18)', 'rgba(100, 116, 139, 0.18)', 'rgba(148, 163, 184, 0.15)'] },
        53: { desc: 'Moderate drizzle', icon: '🌧️', colors: ['rgba(56, 189, 248, 0.2)', 'rgba(100, 116, 139, 0.18)', 'rgba(148, 163, 184, 0.15)'] },
        55: { desc: 'Dense drizzle', icon: '🌧️', colors: ['rgba(56, 189, 248, 0.25)', 'rgba(71, 85, 105, 0.2)', 'rgba(100, 116, 139, 0.15)'] },
        61: { desc: 'Light rain', icon: '🌧️', colors: ['rgba(59, 130, 246, 0.2)', 'rgba(100, 116, 139, 0.18)', 'rgba(71, 85, 105, 0.15)'] },
        63: { desc: 'Moderate rain', icon: '🌧️', colors: ['rgba(37, 99, 235, 0.22)', 'rgba(71, 85, 105, 0.2)', 'rgba(51, 65, 85, 0.15)'] },
        65: { desc: 'Heavy rain', icon: '🌧️', colors: ['rgba(29, 78, 216, 0.25)', 'rgba(51, 65, 85, 0.25)', 'rgba(30, 41, 59, 0.2)'] },
        71: { desc: 'Light snow', icon: '🌨️', colors: ['rgba(226, 232, 240, 0.2)', 'rgba(203, 213, 225, 0.2)', 'rgba(148, 163, 184, 0.15)'] },
        73: { desc: 'Moderate snow', icon: '🌨️', colors: ['rgba(241, 245, 249, 0.22)', 'rgba(226, 232, 240, 0.22)', 'rgba(203, 213, 225, 0.15)'] },
        75: { desc: 'Heavy snow', icon: '❄️', colors: ['rgba(248, 250, 252, 0.25)', 'rgba(241, 245, 249, 0.25)', 'rgba(226, 232, 240, 0.2)'] },
        77: { desc: 'Snow grains', icon: '❄️', colors: ['rgba(226, 232, 240, 0.2)', 'rgba(203, 213, 225, 0.2)', 'rgba(148, 163, 184, 0.15)'] },
        80: { desc: 'Light rain showers', icon: '🌦️', colors: ['rgba(56, 189, 248, 0.2)', 'rgba(250, 204, 21, 0.15)', 'rgba(148, 163, 184, 0.15)'] },
        81: { desc: 'Moderate rain showers', icon: '🌦️', colors: ['rgba(59, 130, 246, 0.22)', 'rgba(148, 163, 184, 0.2)', 'rgba(100, 116, 139, 0.15)'] },
        82: { desc: 'Violent rain showers', icon: '🌧️', colors: ['rgba(29, 78, 216, 0.25)', 'rgba(71, 85, 105, 0.25)', 'rgba(51, 65, 85, 0.2)'] },
        85: { desc: 'Light snow showers', icon: '🌨️', colors: ['rgba(226, 232, 240, 0.2)', 'rgba(148, 163, 184, 0.2)', 'rgba(100, 116, 139, 0.15)'] },
        86: { desc: 'Heavy snow showers', icon: '❄️', colors: ['rgba(241, 245, 249, 0.25)', 'rgba(203, 213, 225, 0.25)', 'rgba(148, 163, 184, 0.2)'] },
        95: { desc: 'Thunderstorm', icon: '⛈️', colors: ['rgba(139, 92, 246, 0.25)', 'rgba(71, 85, 105, 0.25)', 'rgba(30, 41, 59, 0.2)'] },
        96: { desc: 'Thunderstorm with light hail', icon: '⛈️', colors: ['rgba(124, 58, 237, 0.25)', 'rgba(100, 116, 139, 0.25)', 'rgba(51, 65, 85, 0.2)'] },
        99: { desc: 'Thunderstorm with heavy hail', icon: '⛈️', colors: ['rgba(109, 40, 217, 0.3)', 'rgba(148, 163, 184, 0.25)', 'rgba(71, 85, 105, 0.2)'] },
    };

    const w = weatherIcons[code] || weatherIcons[2];

    document.getElementById('weather-temp').textContent = temp + '°C';
    document.getElementById('weather-desc').textContent = w.desc;
    document.getElementById('weather-icon').textContent = w.icon;
    document.getElementById('weather-loc').textContent = locName;

    document.documentElement.style.setProperty('--bg-color-1', w.colors[0]);
    document.documentElement.style.setProperty('--bg-color-2', w.colors[1]);
    document.documentElement.style.setProperty('--bg-color-3', w.colors[2]);
}

fetchWeather();
setInterval(fetchWeather, 30 * 60 * 1000);

// ------------- BOOKMARKS -------------
const defaultBookmarks = [
    { name: 'Outlook', url: 'https://outlook.live.com/mail/0/', icon: '📧' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
    { name: 'Router', url: 'http://192.168.8.1/#/internet', icon: '🛜' },
    { name: 'GitHub', url: 'https://github.com/dan-lee76', icon: '🐙' },
    { name: 'Cloudflare', url: 'https://dash.cloudflare.com', icon: '☁️' }
];

function loadBookmarks() {
    const saved = localStorage.getItem('startpage_bookmarks_v2');
    let bookmarks = saved ? JSON.parse(saved) : defaultBookmarks;
    renderBookmarks(bookmarks);
}

function saveBookmarks(bookmarks) {
    localStorage.setItem('startpage_bookmarks_v2', JSON.stringify(bookmarks));
    renderBookmarks(bookmarks);
}

function renderBookmarks(bookmarks) {
    const container = document.getElementById('bookmarks');
    const addBtn = document.getElementById('add-bookmark-btn');
    container.innerHTML = '';

    bookmarks.forEach((bm, index) => {
        const a = document.createElement('a');
        a.href = bm.url;
        a.className = 'bookmark';

        const icon = document.createElement('span');
        icon.className = 'bookmark-icon';
        icon.textContent = bm.icon || '🌐';

        const name = document.createElement('span');
        name.textContent = bm.name;

        const delBtn = document.createElement('button');
        delBtn.className = 'bookmark-delete';
        delBtn.innerHTML = '×';
        delBtn.title = "Remove";
        delBtn.onclick = (e) => {
            e.preventDefault();
            bookmarks.splice(index, 1);
            saveBookmarks(bookmarks);
        };

        a.appendChild(icon);
        a.appendChild(name);
        a.appendChild(delBtn);
        container.appendChild(a);
    });

    container.appendChild(addBtn);
}

document.getElementById('add-bookmark-btn').addEventListener('click', () => {
    const name = prompt("Enter site name:");
    if (!name) return;
    let url = prompt("Enter URL:", "https://");
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    const icon = prompt("Enter an emoji for the icon (optional):", "🌐") || "🌐";

    const saved = localStorage.getItem('startpage_bookmarks_v2');
    let bookmarks = saved ? JSON.parse(saved) : defaultBookmarks;
    bookmarks.push({ name, url, icon });
    saveBookmarks(bookmarks);
});

loadBookmarks();

// ------------- CURSOR GLOW -------------
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
});

// ------------- EVENTS -------------
const myEvents = [
    { title: "Team Sync", time: "Tomorrow, 10:00 AM", color: "#6366f1" },
    { title: "Doctor Appointment", time: "Friday, 2:30 PM", color: "#ec4899" }
];

function renderEvents() {
    const list = document.getElementById('events-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (myEvents.length === 0) {
        list.innerHTML = '<div class="no-events">No upcoming events</div>';
        return;
    }
    
    myEvents.forEach(ev => {
        const item = document.createElement('div');
        item.className = 'event-item';
        if (ev.color) item.style.borderLeftColor = ev.color;
        
        const details = document.createElement('div');
        details.className = 'event-details';
        
        const title = document.createElement('div');
        title.className = 'event-title';
        title.textContent = ev.title;
        
        const time = document.createElement('div');
        time.className = 'event-time';
        time.textContent = ev.time;
        
        details.appendChild(title);
        details.appendChild(time);
        item.appendChild(details);
        list.appendChild(item);
    });
}
renderEvents();
