let now = new Date();
let div6 = document.querySelector("div6");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
div6.innerHTML = `${day} ${hours}:${minutes}`;

function cityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let city = document.querySelector("#search-text").value;
  let apiKey = "75e5c0679220bdae6719f0490660f35d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", cityName);

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#number");
  currentTemperature.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "75e5c0679220bdae6719f0490660f35d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalTemperature);
  axios.get(apiUrl).then(showLocalCity);
}
function showLocalTemperature(response) {
  let localTemp = Math.round(response.data.main.temp);
  let currentLocalTemp = document.querySelector("#number");
  currentLocalTemp.innerHTML = localTemp;
}

function showLocalCity(response) {
  let localCity = response.data.name;
  let currentLocalCity = document.querySelector("h1");
  currentLocalCity.innerHTML = localCity;
}
let currentLocation = document.querySelector("#geo-button");
currentLocation.addEventListener("click", getCurrentPosition);
