import type { WeatherCondition } from '../types/weather'
import { mapPeriodLabel } from '../utils/weatherTransform'

export function renderWeatherDashboard(container: HTMLElement, weather: WeatherCondition): void {
  const periodLabel = mapPeriodLabel(weather.isDay)
  const lastUpdated = new Date(weather.updatedAt).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  container.innerHTML = `
    <main class="dashboard" aria-live="polite">
      <aside class="sidebar" aria-label="Resumo do clima">
        <div class="sidebar-card sidebar-card--highlight">
          <p class="label">Temperatura</p>
          <p class="value">${weather.temperature.toFixed(0)}°C</p>
        </div>
        <div class="sidebar-card">
          <p class="label">Cidade</p>
          <p class="value">${weather.city}</p>
        </div>
        <div class="sidebar-card">
          <p class="label">Período</p>
          <p class="value">${periodLabel}</p>
        </div>
        <div class="sidebar-card">
          <p class="label">Condição</p>
          <p class="value">${weather.weatherDescription}</p>
        </div>
      </aside>

      <section class="main-panel" aria-label="Detalhes do clima">
        <div class="detail-grid">
          <div class="detail-card">
            <p class="label">Umidade</p>
            <p class="value">${weather.humidity}%</p>
          </div>
          <div class="detail-card">
            <p class="label">Sensação térmica</p>
            <p class="value">${weather.feelsLike.toFixed(0)}°C</p>
          </div>
          <div class="detail-card">
            <p class="label">Vento</p>
            <p class="value">${weather.windSpeed.toFixed(0)} km/h</p>
          </div>
          <div class="detail-card">
            <p class="label">Probabilidade de chuva</p>
            <p class="value">${weather.precipitationProbability}%</p>
          </div>
        </div>
        <div class="detail-card">
          <p class="label">Atualizado em</p>
          <p class="value">${lastUpdated}</p>
        </div>
      </section>
    </main>
  `
}
