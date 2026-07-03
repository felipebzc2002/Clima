export function renderAppShell(container: HTMLElement): void {
  container.innerHTML = `
    <section class="app-shell" aria-label="Aplicativo de clima">
      <header class="app-header">
        <p class="eyebrow">Weather App</p>
        <h1>Clima</h1>
        <p class="intro">
          A estrutura inicial do projeto já foi preparada para a próxima etapa da implementação.
        </p>
      </header>
    </section>
  `
}
