const api = "597cbc6333384e9dbaf40925240908"
let app = document.querySelector(".weather-app");
let cities_ul = document.querySelector(".cities");
let city_lis = document.querySelectorAll(".city");
let search = document.querySelector(".search");
let btn = document.querySelector("button");
let details_ul = document.querySelector(".details");
let h4 = document.querySelector("h4");
let details_lis = document.querySelector(".details li")
let spans = document.querySelectorAll(".details li .span")
let icon = document.querySelector(".icon");
let form = document.querySelector("form")
let degree = document.querySelector(".temp span")
let displayCityName = document.querySelector(".city-time h1")
let cloudy = document.querySelector(".cloudy")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let weather_condition = document.querySelector(".condition")
let countryName = document.querySelector(".countryName")
let timeOutput = document.querySelector(".time")
let dateOutput = document.querySelector(".date")
let city_name;

const baseURL = "http://api.weatherapi.com/v1/current.json?key=597cbc6333384e9dbaf40925240908&q="








navigator.geolocation.getCurrentPosition(gotlocation,faillocation)

async function gotlocation(position){
    console.log(position);
    getDetailsCurr(position.coords.latitude,position.coords.longitude)
}
function faillocation(){
   alert("not get location");
}


async function getDetailsCurr(lat,lon) {
   
    try{
    let res = await fetch(baseURL+`${lat},${lon}`);
    console.log(res);
        let data = await res.json();
        console.log(data);
        degree.innerHTML = data.current.temp_c;
        displayCityName.innerHTML = data.location.name;
        cloudy.innerHTML = data.current.cloud +"%";
        humidity.innerHTML = data.current.humidity +"%";
        wind.innerHTML = data.current.wind_kph +"km/hr"; 
        icon.setAttribute("src",data.current.condition.icon);
        weather_condition.innerHTML = data.current.condition.text
        countryName.innerHTML = `Country : ${data.location.country}`

        let date = data.location.localtime;
        console.log(date);
        let year = parseInt(date.substr(0,4))
        let month = parseInt(date.substr(5,2))
        let day = parseInt(date.substr(8,2))
        console.log(day);
        if(day<10)
        {
            day = `0${day}`;
        }

        let time = date.substr(11);
        timeOutput.innerHTML = time;
        dateOutput.innerHTML = `${dayOfTheWeek(day,month,year)} ${getMonthName(month)} ${day}`

       let dayNight = "day";
       if(!data.current.is_day)
       {
        dayNight = "night";
       }

       let code = data.current.condition.code;
       //clean
       if(code == 1000)
       {
        app.style.backgroundImage = `url(./images/${dayNight}/clean.jpg)`
        btn.style.background = "#e5ba92"
        if(dayNight == "night")
        {
        btn.style.background = "#181e27"
        }
       }
       //clody
       else if(
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282 
       ){
        app.style.backgroundImage = `url(./images/${dayNight}/cloudy.jpg)`
        btn.style.background = "#fa6d1b"
        if(dayNight == "night")
        {
        btn.style.background = "#181e27"
        }
       }
//rain 
       else if(
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 
       ){
        app.style.backgroundImage = `url(./images/${dayNight}/rain.jpg)`
        btn.style.background = "#647d75";
        if(dayNight == "night")
        {
        btn.style.background = "#325c80";
        }
       }
       //snow
       else{
        app.style.backgroundImage = `url(./images/${dayNight}/snow.jpg)`
        btn.style.background = "#4d72aa";
        if(dayNight == "night")
        {
        btn.style.background = "#1b1b1b";
        }
       }

       app.style.opacity = 1
    }
    catch(e)
    {
      alert("Location not found ! Please enter valid location")
    }

    }


function dayOfTheWeek(day,month,year)
{
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return weekday[new Date(`${month}/${day}/${year}`).getDay()]
}

function getMonthName(month) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[month - 1];
}
























city_lis.forEach((city_li)=>{
    city_li.addEventListener("click",(e)=>{
        city_name = e.target.innerHTML;
        getDetails();
    })
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(search.value.length == 0)
    {
        alert("Please type in a city name")
    }
    else{
        city_name = search.value;
        getDetails()
        search.value=""
    }
})

async function getDetails() {
   
    try{
    let res = await fetch(baseURL+`${city_name}`);
    console.log(res);
        let data = await res.json();
        console.log(data);
        degree.innerHTML = data.current.temp_c;
        displayCityName.innerHTML = data.location.name;
        cloudy.innerHTML = data.current.cloud +"%";
        humidity.innerHTML = data.current.humidity +"%";
        wind.innerHTML = data.current.wind_kph +"km/hr"; 
        icon.setAttribute("src",data.current.condition.icon);
        weather_condition.innerHTML = data.current.condition.text
        countryName.innerHTML = `Country : ${data.location.country}`

        let date = data.location.localtime;
        console.log(date);
        let year = parseInt(date.substr(0,4))
        let month = parseInt(date.substr(5,2))
        let day = parseInt(date.substr(8,2))
        console.log(day);
        if(day<10)
        {
            day = `0${day}`;
        }

        let time = date.substr(11);
        timeOutput.innerHTML = time;
        dateOutput.innerHTML = `${dayOfTheWeek(day,month,year)} ${getMonthName(month)} ${day}`

       let dayNight = "day";
       if(!data.current.is_day)
       {
        dayNight = "night";
       }

       let code = data.current.condition.code;
       //clean
       if(code == 1000)
       {
        app.style.backgroundImage = `url(./images/${dayNight}/clean.jpg)`
        btn.style.background = "#e5ba92"
        if(dayNight == "night")
        {
        btn.style.background = "#181e27"
        }
       }
       //clody
       else if(
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282 
       ){
        app.style.backgroundImage = `url(./images/${dayNight}/cloudy.jpg)`
        btn.style.background = "#fa6d1b"
        if(dayNight == "night")
        {
        btn.style.background = "#181e27"
        }
       }
//rain 
       else if(
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 
       ){
        app.style.backgroundImage = `url(./images/${dayNight}/rain.jpg)`
        btn.style.background = "#647d75";
        if(dayNight == "night")
        {
        btn.style.background = "#325c80";
        }
       }
       //snow
       else{
        app.style.backgroundImage = `url(./images/${dayNight}/snow.jpg)`
        btn.style.background = "#4d72aa";
        if(dayNight == "night")
        {
        btn.style.background = "#1b1b1b";
        }
       }

       app.style.opacity = 1
    }
    catch(e)
    {
      alert("Location not found ! Please enter valid location")
    }

    }


function dayOfTheWeek(day,month,year)
{
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return weekday[new Date(`${month}/${day}/${year}`).getDay()]
}

function getMonthName(month) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[month - 1];
}
