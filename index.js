document.getElementById("search").addEventListener("click", async () => {
      let city = document.getElementById("city").value.trim();
      if (!city) return alert("Enter a city name");

      try {
        let res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34f987f46a88c97f70220b670fc353a9`
        );

        if (res.status !== 200) {
          return alert("City not found");
        }

        let data = await res.json();
        console.log(data);

        let temp = (data.main.temp - 273.15).toFixed(1);
        let feels = (data.main.feels_like - 273.15).toFixed(1);
        let min = (data.main.temp_min - 273.15).toFixed(1);
        let max = (data.main.temp_max - 273.15).toFixed(1);

        document.getElementById("display").innerHTML = `

          <div class="flex flex-col items-center gap-6">
            <h2 class="text-3xl font-bold tracking-wide">${data.name}, ${data.sys.country}</h2>
            <p class="text-sky-100 text-sm">${new Date().toDateString()}</p>

            <div class="flex flex-col items-center">
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
                alt="${data.weather[0].main}" class="w-40">
              <h1 class="text-7xl font-semibold">${temp}°C</h1>
              <p class="text-xl capitalize">${data.weather[0].description}</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 text-sm">
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Feels Like</p>
                <p class="text-lg font-semibold">${feels}°C</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Humidity</p>
                <p class="text-lg font-semibold">${data.main.humidity}%</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Wind</p>
                <p class="text-lg font-semibold">${data.wind.speed} m/s</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Pressure</p>
                <p class="text-lg font-semibold">${data.main.pressure} hPa</p>
              </div>
            </div>

            <div class="flex flex-wrap justify-center gap-6 mt-6 text-sm">
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Min Temp</p>
                <p class="text-lg font-semibold">${min}°C</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Max Temp</p>
                <p class="text-lg font-semibold">${max}°C</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Clouds</p>
                <p class="text-lg font-semibold">${data.clouds.all}%</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3 backdrop-blur-md">
                <p class="text-sky-100">Visibility</p>
                <p class="text-lg font-semibold">${(data.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>
          </div>
          
        `;

        document.getElementById("display").classList.remove("hidden");

      } catch (err) {
        console.log(err);
        alert("Something went wrong. Please try again.");
      }
    });