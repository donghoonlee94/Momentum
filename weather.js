const weather = document.querySelector(".js-weather");
const API_KEY = "fcb3e8602f4be7629109e64264eab504";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(res) {
      // res는 네트워크 정보만 가져오고, json()을 하면 pending 상태가 되고 body(json)으로 접근이 가능하다.
      return res.json();
    }).then(function(json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `현재 온도 : ${temp}, 현재 장소 : ${place}`; 
    })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('위치 정보를 찾을 수 없습니다.')
};

function askForCoords() {
  // getCurrentPosition, success callback, error callback
  navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  }else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();