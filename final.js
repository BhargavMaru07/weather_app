let API_KEY = "597cbc6333384e9dbaf40925240908";
let app = document.querySelector(".weather-app");
let cities_ul = document.querySelector(".cities");
let city_lis = document.querySelectorAll(".city");
let search = document.querySelector(".search");
let btn = document.querySelector("button");
let details_ul = document.querySelector(".details");
let h4 = document.querySelector("h4");
let details_lis = document.querySelector(".details li");
let spans = document.querySelectorAll(".details li .span");
let icon = document.querySelector(".icon");
let form = document.querySelector("form");
let degree = document.querySelector(".temp span");
let displayCityName = document.querySelector(".city-time h1");
let cloudy = document.querySelector(".cloudy");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let weather_condition = document.querySelector(".condition");
let countryName = document.querySelector(".countryName");
let timeOutput = document.querySelector(".time");
let dateOutput = document.querySelector(".date");
let city_name;

const baseURL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;

navigator.geolocation.getCurrentPosition(gotlocation, faillocation);

async function gotlocation(position) {
  const { latitude, longitude } = position.coords;
  getWeatherDetails(`${latitude},${longitude}`);
}

function faillocation() {
  alert("Failed to get location. Please enter a city.");
}

async function getWeatherDetails(query) {
  try {
    let res = await fetch(baseURL + query);
    let data = await res.json();

    // Updating DOM with weather data
    updateWeatherData(data);

    // Set background and styles based on weather code
    setWeatherBackground(data);
  } catch (e) {
    alert("Location not found! Please enter a valid location.");
  }
}

function updateWeatherData(data) {
  degree.innerHTML = data.current.temp_c;
  displayCityName.innerHTML = data.location.name;
  cloudy.innerHTML = data.current.cloud + "%";
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + " km/hr";
  icon.setAttribute("src", data.current.condition.icon);
  weather_condition.innerHTML = data.current.condition.text;
  countryName.innerHTML = `Country: ${data.location.country}`;

  // Format date and time
  let date = data.location.localtime;
  let [year, month, day] = date.substr(0, 10).split("-").map(Number);
  let time = date.substr(11);
  timeOutput.innerHTML = time;
  dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)} ${getMonthName(
    month
  )} ${day}`;
}

function setWeatherBackground(data) {
  let dayNight = data.current.is_day ? "day" : "night";
  let code = data.current.condition.code;

  // Set background and button styles based on weather conditions
  if (code === 1000) {
    app.style.backgroundImage = `url(./images/${dayNight}/clean.jpg)`;
    btn.style.background = dayNight === "night" ? "#181e27" : "#e5ba92";
  } else if (
    [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(
      code
    )
  ) {
    app.style.backgroundImage = `url(./images/${dayNight}/cloudy.jpg)`;
    btn.style.background = dayNight === "night" ? "#181e27" : "#fa6d1b";
  } else if (
    [
      1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1192, 1195, 1204, 1207,
      1240, 1243, 1246, 1249, 1252,
    ].includes(code)
  ) {
    app.style.backgroundImage = `url(./images/${dayNight}/rain.jpg)`;
    btn.style.background = dayNight === "night" ? "#325c80" : "#647d75";
  } else {
    app.style.backgroundImage = `url(./images/${dayNight}/snow.jpg)`;
    btn.style.background = dayNight === "night" ? "#1b1b1b" : "#4d72aa";
  }

  app.style.opacity = 1;
}

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

function getMonthName(month) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1];
}

// Event listeners for city selection and search form
city_lis.forEach((city_li) => {
  city_li.addEventListener("click", (e) => {
    city_name = e.target.innerHTML;
    getWeatherDetails(city_name);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.length === 0) {
    alert("Please type in a city name");
  } else {
    city_name = search.value;
    getWeatherDetails(city_name);
    search.value = "";
  }
});
