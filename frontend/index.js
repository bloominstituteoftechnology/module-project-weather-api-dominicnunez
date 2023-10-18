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
  widget.style.display = "none"
  const info = document.querySelector('.info')
  const baseURL = "http://localhost:3003/api/weather?city="

  dropdown.addEventListener('change', async () => {  
    let cityURL = baseURL + dropdown.value
    
    try {
      dropdown.disabled = true;
      info.textContent = "Fetching weather data..."
      widget.style.display = "none"
      const response = await axios.get(cityURL);
      
      let data = response.data;
      let current = data.current
      let forecast = data.forecast.daily
      let location = data.location

      const getDescriptionEmoji = description => {
        return descriptions.find((e) => e[0] === description)[1];
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
      // let country = document.getElementById('location').children[1]

      apparentTemp.textContent = current.apparent_temperature + "°"
      todayDescription.textContent = getDescriptionEmoji(current.weather_description)
      highLowTemp.textContent = current.temperature_min + "°/" + current.temperature_max + "°"
      precipitation.textContent = "Precipitation: " + (current.precipitation_probability * 100) + "%"
      humidity.textContent = "Humidity: " + current.humidity + "%"
      wind.textContent = "Wind: " + current.wind_speed + "m/s"
      city.textContent = location.city

      // for (let i in forecast) {
      //   let future = forecast[i]
      //   let nextDay = nextDays[i]
      //   nextDay.children[0].textContent = getDayOfWeek(future.date)
      //   nextDay.children[1].textContent = getDescriptionEmoji(future.weather_description)
      //   nextDay.children[2].textContent = future.temperature_min + "°/" + future.temperature_max + "°"
      //   nextDay.children[3].textContent = "Precipitation: " + (future.precipitation_probability * 100) + "%"
      // }

      forecast.forEach((future) => {
        let div = nextDays[forecast.indexOf(future)]
        let day = div.children[0]
        let emoji = div.children[1]
        let minMax = div.children[2]
        let precip = div.children[3]

        day.textContent = getDayOfWeek(future.date)
        emoji.textContent = getDescriptionEmoji(future.weather_description)
        minMax.textContent = future.temperature_min + "°/" + future.temperature_max + "°"
        precip.textContent = "Precipitation: " + (future.precipitation_probability * 100) + "%"
      })

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
