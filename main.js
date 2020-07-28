//Search a city...

const api = {
	key: 'd944cfc973fb372d3ea53f75216ec984',
	mainUrl: 'https://api.openweathermap.org/data/2.5/'
};

const searchbox = document.querySelector(`.search-box`);
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
	if (evt.keyCode == 13) {
		getResults(searchbox.value);
	}
}

function getResults(query) {
	fetch(`${api.mainUrl}weather?q=${query}&units=imperial&APPID=${api.key}`)
		.then((weather) => {
			return weather.json();
		})
		.then(displayResults);
}

function displayResults(weather) {
	let city = document.querySelector('.location .city');
	city.innerHTML = `${weather.name}, ${weather.sys}`;

	let now = new Date();
	let date = document.querySelector('.location .date');
	date.innerHTML = dateBuilder(now);

	let temp = document.querySelector('.current .temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

	let weatherElement = document.querySelector('.current .weather');
	weatherElement.innerHTML = weather.weather[0].main;

	let hilow = document.querySelector('.hi-low');
	hilow.innerHTML = `${Math.round(weather.main.temp_min)}°F | ${Math.round(weather.main.temp_max)}°F`;
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
	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}

//Search Current Location...

function displayWeather(response) {
	document.querySelector('.city').innerHTML = response.data.name;
	document.querySelector('.temp').innerHTML = Math.round(response.data.main.temp);

	document.querySelector('#humidity').innerHTML = response.data.main.humidity;
	document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
}

function searchCurrentLocation(position) {
	let long = position.coords.longitude;
	let lat = position.coords.latitude;

	let apiKey = 'd944cfc973fb372d3ea53f75216ec984';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayWeather);
}

function getCurrent(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentButton = document.querySelector('#current-location-btn');
currentButton.addEventListener('click', getCurrent);
