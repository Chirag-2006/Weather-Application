
// Get DOM elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");

// API key for OpenWeatherMap (replace with your own)
const apiKey = "89cd807b66e97b0c789f936a069f2ab1";

// Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      displayWeather(data);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    weatherDisplay.innerHTML = `<p>${error.message}</p>`;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherDisplay.innerHTML = "<p>Please enter a city name</p>";
  }
});

// Event listener for Enter key in input field
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    } else {
      weatherDisplay.innerHTML = "<p>Please enter a city name</p>";
    }
  }
});
