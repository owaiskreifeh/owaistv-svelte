import HomeView from '../views/HomeView.svelte'
import PlayerView from '../views/PlayerView.svelte'
import LiveView from '../views/LiveView.svelte'
import SettingsView from '../views/SettingsView.svelte'

const routes = {
    "/player/:assetId": PlayerView,
    "/live": LiveView,
    "/settings": SettingsView,
    "*": HomeView,
}

export { routes };