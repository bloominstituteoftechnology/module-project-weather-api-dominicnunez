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
  dropdown.addEventListener('change', async () => {
    // let formattedCity = dropdown.value.replace(" ", "+")
    dropdown.disabled = true;
    const info = document.querySelector('.info')
    info.textContent = "Fetching weather data..."
    const baseURL = "http://localhost:3003/api/weather?city="
    let selectedCity = dropdown.value
    let cityURL = baseURL + selectedCity
    
    try {
      const response = await axios.get(cityURL);
      console.log("Reponse Data: ", response.data)
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
