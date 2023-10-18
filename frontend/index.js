async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  const dropdown = document.getElementById('citySelect')
  const widget = document.getElementById('weatherWidget')
  dropdown.addEventListener('change', async () => {
    // let formattedCity = dropdown.value.replace(" ", "+")
    dropdown.disabled = true;
    const info = document.querySelector('.info')
    info.textContent = "Fetching weather data..."
    const baseURL = "http://localhost:3003/api/weather?city="
    // let selectedCity = 
    let cityURL = baseURL + dropdown.value
    
    try {
      const response = await axios.get(cityURL);
      console.log("Reponse Data: ", response.data)
    
      let data = response.data;
      let current = data.current
      let forecast = data.forecast.daily
      let location = data.location
      // let emojiMap = descriptions.find((e) => e[0] === current.weather_description)

      const emojiMap = description => {
        const weatherMap = descriptions.find((e) => e[0] === description);
        return weatherMap ? weatherMap[1] : "Not found";
      }

      const getDayOfWeek = dateString => {
        const options = { weekday: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      };

      let apparentTemp = document.getElementById('apparentTemp').children[1]
      let todayDescription = document.getElementById('todayDescription')
      let highLowTemp = document.getElementById('todayStats').children[0]
      let precipitation = document.getElementById('todayStats').children[1]
      let humidity = document.getElementById('todayStats').children[2]
      let wind = document.getElementById('todayStats').children[3]
      let nextDays = document.getElementsByClassName('next-day card col')
      let city = document.getElementById('location').children[0]
      let country = document.getElementById('location').children[1]

      apparentTemp.textContent = current.apparent_temperature + "°"
      highLowTemp.textContent = current.temperature_min + "°/" + current.temperature_max + "°"
      precipitation.textContent = "Precipitation: " + (current.precipitation_probability * 100) + "%"
      humidity.textContent = "Humidity: " + current.humidity + "%"
      wind.textContent = "Wind: " + current.wind_speed + "m/s"
      todayDescription.textContent = emojiMap(current.weather_description)
      city.textContent = location.city
      country.textContent = location.country

      console.log(forecast, nextDays)
      for (let i of forecast) {
        console.log(i)
      }

      dropdown.disabled = false;
      info.textContent = ""
      widget.style.display = "block"
    } catch (error) {
      console.error("Error: ", error);
    }
    })
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
