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

function displayResults(response) {
	let tempElement = document.querySelector('.current .temp');
	let city = document.querySelector('.location .city');
	let now = new Date();
	let dateElement = document.querySelector('.location .date');
	let hilowElement = document.querySelector('.hi-low');

	celsiusTemp = response.data.main.temp;

	dateElement.innerHTML = dateBuilder(now);
	tempElement.innerHTML = `${Math.round(celsiusTemp)}`;
	city.innerHTML = response.data.name;
	hilowElement.innerHTML = `${Math.round(response.main.temp_min)}°C | ${Math.round(response.main.temp_max)}°C`;
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

function search(city) {
	let apiKey = 'd944cfc973fb372d3ea53f75216ec984';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayResults);
}

function searchBar(event) {
	event.preventDefault();
	let searchbox = document.querySelector('.search-box');
	search(searchbox.value);
}

// convert to F

function showAsFahrenheit(event) {
	event.preventDefault();
	let fahrenheitTemperature = celsiusTemp * 9 / 5 + 32;
	let temperatureElement = document.querySelector('#temperature');
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

	fahrenheitLink.classList.add('active');
	celsiusLink.classList.remove('active');
}

// Convert to C

function showAsCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector('#temperature');
	temperatureElement.innerHTML = Math.round(celsiusTemp);

	celsiusLink.classList.add('active');
	fahrenheitLink.classList.remove('active');
}

let celsiusTemp = null;

let form = document.querySelector(`#search-form`);
form.addEventListener('submit', searchBar);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showAsFahrenheit);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', showAsCelsius);

let currentButton = document.querySelector('#current-location-btn');
currentButton.addEventListener('click', getCurrent);
