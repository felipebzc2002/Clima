import type { CitySearchApiResponse, CitySearchResult, WeatherApiResponse, WeatherCondition } from '../types/weather'
import { transformWeatherData } from '../utils/weatherTransform'

const GEO_SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

function isValidCoordinate(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export async function searchCity(cityName: string): Promise<CitySearchResult | null> {
  const trimmedName = cityName?.trim()

  if (!trimmedName) {
    return null
  }

  const params = new URLSearchParams({
    name: trimmedName,
    count: '1',
    language: 'pt',
    format: 'json',
  })

  try {
    const response = await fetch(`${GEO_SEARCH_URL}?${params.toString()}`)

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as CitySearchApiResponse
    const result = payload.results?.[0]

    if (!result) {
      return null
    }

    if (!result.name || !isValidCoordinate(result.latitude) || !isValidCoordinate(result.longitude)) {
      return null
    }

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
    }
  } catch {
    return null
  }
}

export async function getWeather(city: CitySearchResult): Promise<WeatherCondition | null> {
  if (!city || !isValidCoordinate(city.latitude) || !isValidCoordinate(city.longitude)) {
    return null
  }

  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: 'precipitation_probability,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,precipitation,wind_speed_10m,wind_direction_10m',
  })

  try {
    const response = await fetch(`${WEATHER_FORECAST_URL}?${params.toString()}`)

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as WeatherApiResponse

    if (!payload?.current) {
      return null
    }

    return transformWeatherData(payload, city.name)
  } catch {
    return null
  }
}
