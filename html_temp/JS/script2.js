// Заміни 'YOUR_ACCESS_KEY' на свій ключ з weatherstack.com
const ACCESS_KEY = '***';
const CITY = 'Holysheve,Lutsk,Ukraine';
const FORECAST_DAYS = 5;

// Завантажуємо і поточну погоду, і прогноз (прогноз доступний на платному тарифі)
async function fetchWeather() {
  try {
    // Поточна погода
    const currentUrl = 
      `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${encodeURIComponent(CITY)}`;
      console.log(currentUrl);
    const currentResp = await fetch(currentUrl,{method: 'GET'});
    if (!currentResp.ok) throw new Error(`Current HTTP ${currentResp.status}`);
    const currentData = await currentResp.json();

    

    renderCurrent(currentData);
    
  } catch (err) {
    document.getElementById('current-content').textContent = 'Помилка завантаження.';
    
    console.error(err);
  }
  setTimeout(async () => {
    
  
    // Прогноз на 5 днів
    const forecastUrl =
      `http://api.weatherstack.com/forecast?access_key=${ACCESS_KEY}` +
      `&query=${encodeURIComponent(CITY)}` +
      `&forecast_days=${FORECAST_DAYS}`;
      console.log(forecastUrl);
    const forecastResp = await fetch(forecastUrl,{method: 'GET'});
    if (!forecastResp.ok) {
        const error_data = await forecastResp.json();
        console.error('Forecast fetch error:', error_data);
        document.getElementById('forecast-content').textContent = 'Помилка завантаження прогнозу.';
    }else{
    const forecastData = await forecastResp.json();
    renderForecast(forecastData);
    }
  }, 5000);
}

function renderCurrent(data) {
  const loc = data.location;
  const cur = data.current;
  const container = document.getElementById('current-content');
  
  container.innerHTML = `
    <p><strong>Місто:</strong> ${loc.name}, ${loc.country}</p>
    <p><strong>Оновлено:</strong> ${loc.localtime}</p>
    <p>
      <img src="${cur.weather_icons[0]}" alt="${cur.weather_descriptions[0]}" />
      ${cur.temperature}&deg;C — ${cur.weather_descriptions[0]}
    </p>
    <p><strong>Вітер:</strong> ${cur.wind_speed} км/год</p>
    <p><strong>Опади:</strong> ${cur.precip} мм</p>
    <p><strong>Тиск:</strong> ${cur.pressure} мб</p>
    <p><strong>Вологість:</strong> ${cur.humidity}%</p>
    <p><strong>Видимість:</strong> ${cur.visibility} км</p>
    <p><strong>UV-індекс:</strong> ${cur.uv_index}</p>
    <p><strong>Якість повітря (PM2.5):</strong> ${cur.air_quality['pm2_5']} µg/m³</p>
    <p><strong>Схід сонця:</strong> ${cur.astro.sunrise} &nbsp; <strong>Захід:</strong> ${cur.astro.sunset}</p>
  `;
}

function renderForecast(forecastObj) {
  const container = document.getElementById('forecast-content');
  // forecastObj — об’єкт з ключами-датами
  const days = Object.keys(forecastObj).slice(0, FORECAST_DAYS);
  container.innerHTML = days
    .map(dateStr => {
      const day = forecastObj[dateStr];
      const date = new Date(day.date);
      const weekday = date.toLocaleDateString('uk-UA', { weekday: 'long' });
      return `
        <div class="forecast-day">
          <div><strong>${weekday}</strong></div>
          <div>${day.date}</div>
          <div>
            <img src="${day.day.weather_icons[0]}" alt="${day.day.weather_descriptions[0]}" />
          </div>
          <div>${day.day.avgtemp}°C</div>
        </div>
      `;
    })
    .join('');
}

window.addEventListener('DOMContentLoaded', fetchWeather);