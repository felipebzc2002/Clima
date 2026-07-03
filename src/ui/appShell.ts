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

      <main class="dashboard dashboard--hidden" aria-live="polite">
        <aside class="sidebar" aria-label="Resumo do clima">
          <div class="sidebar-card sidebar-card--highlight">
            <p class="label">Temperatura</p>
            <p class="value">--°C</p>
          </div>
          <div class="sidebar-card">
            <p class="label">Dia atual</p>
            <p class="value">--</p>
          </div>
          <div class="sidebar-card">
            <p class="label">Período</p>
            <p class="value">Dia / Noite</p>
          </div>
          <div class="sidebar-card">
            <p class="label">Condição</p>
            <p class="value">--</p>
          </div>
        </aside>

        <section class="main-panel" aria-label="Detalhes do clima">
          <div class="detail-grid">
            <div class="detail-card">
              <p class="label">Umidade</p>
              <p class="value">--%</p>
            </div>
            <div class="detail-card">
              <p class="label">Sensação térmica</p>
              <p class="value">--°C</p>
            </div>
            <div class="detail-card">
              <p class="label">Vento</p>
              <p class="value">-- km/h</p>
            </div>
            <div class="detail-card">
              <p class="label">Probabilidade de chuva</p>
              <p class="value">--%</p>
            </div>
          </div>
        </section>
      </main>
    </section>
  `
}
