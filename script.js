function displayTemperature(response) {
  let temperatureElement = document.querySelector("#actual-temp");
  let cityElement = document.querySelector("#chosen-city");
  let temperature = Math.round(response.data.temperature.current);
  let currentConditionElement = document.querySelector("#current-condition");
  let currentHumidityElement = document.querySelector("#humidity");
  let currentWindSpeedElement = document.querySelector("#wind-speed");
  let weatherEmojiElement = document.querySelector("#emoji-image");
  let emojiIconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  currentConditionElement.innerHTML = response.data.condition.description;
  currentHumidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  currentWindSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  weatherEmojiElement.src = response.data.condition.icon_url;
  emojiIconElement.innerHTML = "";
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city");

  let city = searchInputElement.value;
  let apiKey = "obc25ed040a8998de4b43f2ea367t025";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let enterCity = document.querySelector(".form-group");
enterCity.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
