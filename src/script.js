let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuersday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function search(event) {
  event.preventDefault();
  //alert("searching");
  let searchInput = document.querySelector("#search-text-input");
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let apiKey = "0aad4c0893e446f9a51692da9cd797e8";
let city = "Bucharest";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = `${temperature}°C`;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function showTemp(response) {
  //console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  let p = document.querySelector("#your-location");
  p.innerHTML = `The outside temperature is ${temp}°C in in ${response.data.name}`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  //console.log(url);
  axios.get(url).then(showTemp);
}

let button = document.querySelector("button");
button.addEventListener("click", retrievePosition);

navigator.geolocation.getCurrentPosition(retrievePosition);
