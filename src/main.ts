import './style.css'
import { renderAppShell } from './ui/appShell'

const root = document.querySelector<HTMLDivElement>('#app')

if (root) {
  renderAppShell(root)
}
