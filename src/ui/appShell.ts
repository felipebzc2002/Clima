import { getWeather, searchCity } from '../services/weatherService'
import { renderErrorState, renderLoadingState } from './stateViews'
import { renderWeatherDashboard } from './weatherDashboard'

function renderEmptyState(container: HTMLElement): void {
  container.innerHTML = `
    <div class="state-card empty-state-card" role="status">
      <p class="label">Comece por aqui</p>
      <p class="value">Pesquise uma cidade para ver o clima atual.</p>
    </div>
  `
}

export function renderAppShell(container: HTMLElement): void {
  container.innerHTML = `
    <section class="app-shell" aria-label="Aplicativo de clima">
      <header class="app-header">
        <div class="app-title-block">
          <p class="eyebrow">Weather App</p>
          <h1>Clima</h1>
        </div>
        <form class="search-form" id="search-form">
          <input
            id="city-input"
            class="search-input"
            type="text"
            name="city"
            placeholder="Digite o nome da cidade"
            autocomplete="off"
          />
          <button class="search-button" type="submit">Buscar</button>
        </form>
      </header>

      <div id="status-region"></div>
    </section>
  `

  const form = container.querySelector<HTMLFormElement>('#search-form')
  const statusRegion = container.querySelector<HTMLDivElement>('#status-region')

  if (!form || !statusRegion) {
    return
  }

  const input = form.querySelector<HTMLInputElement>('#city-input')
  const button = form.querySelector<HTMLButtonElement>('.search-button')

  const setBusyState = (isBusy: boolean): void => {
    if (!input || !button) {
      return
    }

    input.disabled = isBusy
    button.disabled = isBusy
    button.textContent = isBusy ? 'Buscando...' : 'Buscar'
    form.setAttribute('aria-busy', String(isBusy))
  }

  renderEmptyState(statusRegion)

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (form.getAttribute('aria-busy') === 'true') {
      return
    }

    if (!input) {
      return
    }

    const cityName = input.value.trim()

    if (!cityName) {
      renderErrorState(statusRegion, 'Informe o nome de uma cidade para continuar.')
      return
    }

    setBusyState(true)
    renderLoadingState(statusRegion)

    try {
      const city = await searchCity(cityName)

      if (!city) {
        renderErrorState(statusRegion, 'Não foi possível encontrar essa cidade. Tente novamente.')
        return
      }

      const weather = await getWeather(city)

      if (!weather) {
        renderErrorState(statusRegion, 'Não foi possível carregar as informações do clima dessa cidade.')
        return
      }

      renderWeatherDashboard(statusRegion, weather)
    } finally {
      setBusyState(false)
    }
  })
}
