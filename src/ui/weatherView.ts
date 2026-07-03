import type { WeatherCondition } from '../types/weather'

export function renderWeatherView(container: HTMLElement, weather: WeatherCondition): void {
  container.innerHTML = `
    <section class="weather-view" aria-live="polite">
      <div class="weather-summary">
        <p class="weather-city">${weather.city}</p>
        <h2>${weather.temperature.toFixed(0)}°C</h2>
        <p>${weather.weatherDescription}</p>
      </div>
    </section>
  `
}
