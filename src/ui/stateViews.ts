export function renderLoadingState(container: HTMLElement): void {
  container.innerHTML = `
    <div class="state-card loading-state" role="status" aria-live="polite">
      <p class="label">Carregando</p>
      <p class="value">Buscando as informações do clima...</p>
    </div>
  `
}

export function renderErrorState(container: HTMLElement, message: string): void {
  container.innerHTML = `
    <div class="state-card error-state" role="alert">
      <p class="label">Ops</p>
      <p class="value">${message}</p>
    </div>
  `
}
