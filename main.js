//Search a city...

const api = {
	key: 'd944cfc973fb372d3ea53f75216ec984',
	mainUrl: 'https://api.openweathermap.org/data/2.5/'
};

const searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener('submit', setQuery);

function setQuery(event) {
	event.preventDefault();
	let searchbox = document.querySelector('.search-box');
	getResults(searchbox.value);
}

//function getResults(query) {
//	fetch(`${api.mainUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
//		.then((weather) => {
//			return weather.json();
//		})
//		.then(displayResults);
//}

function displayResults(response) {
	let cityElement = document.querySelector('.location .city');
	let now = new Date();
	let dateElement = document.querySelector('.location .date');
	let hilowElement = document.querySelector('.hi-low');
	let weatherElement = document.querySelector('.current .weather');
	let tempElement = document.querySelector('.current .temp');

	celsiusTemp = response.data.main.temp;

	dateElement.innerHTML = dateBuilder(now);
	tempElement.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
	weatherElement.innerHTML = weather.weather[0].main;
	cityElement.innerHTML = `${weather.name}, ${weather.sys.country}`;
	hilowElement.innerHTML = `${Math.round(weather.main.temp_min)}°F | ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder(d) {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'Novemeber',
		'December'
	];
	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	return `${day} ${date} ${month} ${year}`;
}

function searchCurrentLocation(position) {
	let long = position.coords.longitude;
	let lat = position.coords.latitude;

	let apiKey = 'd944cfc973fb372d3ea53f75216ec984';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayResults);
}

function getCurrent(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentButton = document.querySelector('#current-location-btn');
currentButton.addEventListener('click', getCurrent);

// convert to F

function showAsFahrenheit(event) {
	event.preventDefault();
	let fahrenheitTemperature = celsiusTemp * 9 / 5 + 32;
	let temperatureElement = document.querySelector('#temperature');
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

	fahrenheitLink.classList.add('active');
	celsiusLink.classList.remove('active');
}

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showAsFahrenheit);

// Convert to C

function showAsCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector('#temperature');
	temperatureElement.innerHTML = Math.round(celsiusTemp);

	celsiusLink.classList.add('active');
	fahrenheitLink.classList.remove('active');
}

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', showAsCelsius);

let celsiusTemp = null;
