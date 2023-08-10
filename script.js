document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cityInput = document.getElementById('city-input').value;
    localStorage.setItem('city', cityInput);

    window.location.href = 'weather.html';
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const city = localStorage.getItem('city');

  if (city) {
      fetchWeatherData(city);
  }
});



function fetchWeatherData(city) {
  const apiKey = '8ee393e1cf89dfbb1d65c5f9286f641d';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const temperature = Math.round(data.main.temp);
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;

          // display weather icon using weather data 
          const weatherIcon=document.getElementById('weather-icon');
          if(data.weather[0].main=="Clouds"){
            weatherIcon.src="images/clouds.png";
          }
          else if (data.weather[0].main=="Clear"){
            weatherIcon.src="images/clear.png";
          }
          else if (data.weather[0].main=="Rain"){
            weatherIcon.src="images/rain.png";
          }
          else if (data.weather[0].main=="Drizzle"){
            weatherIcon.src="images/drizzle.png";
          }
          else if (data.weather[0].main=="Mist"){
            weatherIcon.src="images/mist.png";
          }
          // change background image with city name 
          document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')"

        
          // Display weather information on the page
          const weatherInfoTemp = document.getElementById('weather-info-temp');
          weatherInfoTemp.innerHTML =`<h1 class="temp">${temperature} °C</h1>`

          const weatherInfo = document.getElementById('weather-info-city');
          weatherInfo.innerHTML =`<h2 class="city"> ${city}</h2>`

          const weatherInfoHumadity = document.getElementById('weather-info-humidity');
          weatherInfoHumadity.innerHTML =`  <div class="col">
          <img src="images/humidity.png">
          <div>
              <p>${humidity} %</p>  
              <p>humidity</p>
          </div>
      </div>`

          const weatherInfoCondition = document.getElementById('weather-info-condition');
          weatherInfoCondition.innerHTML =`<div class="col">
          <img src="images/wind.png">
          <div>
              
              <p>${windSpeed} km/h</p>
              <p>wind Speed</p>
          </div>
      </div>`
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
          
      });
}


