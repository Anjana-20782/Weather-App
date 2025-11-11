// 🕒 Show current date and time
function updateDateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("date").textContent = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
updateDateTime();
setInterval(updateDateTime, 60000);

// 🌍 Function to fetch weather by coordinates
async function fetchWeather(lat, lon) {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=34f987f46a88c97f70220b670fc353a9`
    );
    if (res.status !== 200) return alert("Weather data not found");

    let data = await res.json();
    const clouds = data.clouds.all;

    // 🌤️ Background
    const cloudyBg = "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg')";
    const clearBg = "url('https://t3.ftcdn.net/jpg/14/63/72/50/360_F_1463725010_Omm579saIDvqCYqXN3rBRbTQ0SBR0sby.jpg')";
    document.body.style.backgroundImage = clouds >= 75 ? cloudyBg : clearBg;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 2s ease-in-out";

    // 🌡️ Temperature
    let temp = (data.main.temp - 273.15).toFixed(1);
    let feels = (data.main.feels_like - 273.15).toFixed(1);
    let min = (data.main.temp_min - 273.15).toFixed(1);
    let max = (data.main.temp_max - 273.15).toFixed(1);

    // 🌆 Display Data
    document.getElementById("display").innerHTML = `
      <div class="flex flex-col items-center gap-6">
        <h2 class="text-3xl font-bold tracking-wide">${data.name}, ${data.sys.country}</h2>
        <p class="text-sky-100 text-sm">${new Date().toDateString()}</p>
        <div class="flex flex-col items-center">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" class="w-40">
          <h1 class="text-7xl font-semibold">${temp}°C</h1>
          <p class="text-xl capitalize">${data.weather[0].description}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 text-sm">
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Feels Like</p><p>${feels}°C</p></div>
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Humidity</p><p>${data.main.humidity}%</p></div>
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Wind</p><p>${data.wind.speed} m/s</p></div>
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Pressure</p><p>${data.main.pressure} hPa</p></div>
        </div>
        <div class="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Min Temp</p><p>${min}°C</p></div>
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Max Temp</p><p>${max}°C</p></div>
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Clouds</p><p>${data.clouds.all}%</p></div>
          <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md"><p>Visibility</p><p>${(data.visibility / 1000).toFixed(1)} km</p></div>
        </div>
      </div>
    `;
    document.getElementById("display").classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
}

// 📍 Auto detect location
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        console.warn(err.message);
        alert("Location access denied. Please enable GPS or enter city manually.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
}

// 🚀 Run automatically on load
window.addEventListener("load", getCurrentLocation);

// 🔍 Optional: manual search also works
document.getElementById("search").addEventListener("click", async () => {
  let city = document.getElementById("city").value.trim();
  if (!city) return getCurrentLocation(); // fallback to current location
  let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34f987f46a88c97f70220b670fc353a9`);
  let data = await res.json();
  fetchWeather(data.coord.lat, data.coord.lon);
});
