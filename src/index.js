function showDateTime() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  return `${day} ${hours}: ${minutes}`;
}

let now = new Date();
let timeDayNow = document.querySelector("#timeNow");
timeDayNow.innerHTML = showDateTime();

// Search City= User input is display as City Name

function search(city) {
  let apiKey = "8d3b4eb3bfd4da849a5a61c1e36fe700";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(getTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  let cityName = document.querySelector("#city_name");
  if (city.value) {
    cityName.innerHTML = `${city.value}`;
    search(city.value);
  } else {
    cityName.innerHTML = null;
    alert("Please enter a city");
  }
  search(city);
}

// Temperature Convertion

function convertToF(event) {
  event.preventDefault();
  let citytemp = document.querySelector("#city_temp");
  citytemp.innerHTML = 90;
}

function convertToC(event) {
  event.preventDefault();
  let citytemp = document.querySelector("#city_temp");
  citytemp.innerHTML = 32;
}

let fahrenheitlink = document.querySelector("#fahrenheit_link");
fahrenheitlink.addEventListener("click", convertToF);

let celsiuslink = document.querySelector("#celsius_link");
celsiuslink.addEventListener = ("click", convertToC);

// What displays the city temperature

function getTemp(response) {
  console.log(response);
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempmax = Math.round(response.data.main.temp_max);
  let tempmin = Math.round(response.data.main.temp_min);
  let city_temp = document.querySelector("#city_temp");
  let temp_high = document.querySelector("#temp_max");
  let temp_lo = document.querySelector("#temp_min");
  let cityName = document.querySelector("#city_name");

  city_temp.innerHTML = `${temperature}°F`;
  temp_high.innerHTML = `H: ${tempmax}°F`;
  temp_lo.innerHTML = `L: ${tempmin}°F`;
  cityName.innerHTML = `${city}`;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(GetCurrentLocation);
}

function GetCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8d3b4eb3bfd4da849a5a61c1e36fe700";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getTemp);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getPosition);

let searchLocationButton = document.querySelector("#searchButton");
searchLocationButton.addEventListener("click", handleSubmit);

search("San Juan");
