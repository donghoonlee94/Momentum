const API_KEY = "fcb3e8602f4be7629109e64264eab504";
const COORDS = "coords";

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
  console.log(position);
  saveCoords(coordsObj);
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
    // getWeather
  }
}

function init() {
  loadCoords();
}

init();