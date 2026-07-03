import type { WeatherApiResponse, WeatherCondition } from '../types/weather'

const WEATHER_CODE_LABELS: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Predomínio de sol',
  2: 'Parcialmente nublado',
  3: 'Encoberto',
  45: 'Nevoeiro',
  48: 'Nevoeiro com geada',
  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa densa',
  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  71: 'Neve leve',
  73: 'Neve moderada',
  75: 'Neve forte',
  77: 'Granizo',
  80: 'Pancadas leves',
  81: 'Pancadas moderadas',
  82: 'Pancadas fortes',
  85: 'Neve leve',
  86: 'Neve forte',
  95: 'Tempestade',
  96: 'Tempestade com granizo',
  99: 'Tempestade severa com granizo',
}

export function mapWeatherCode(weatherCode: number): string {
  return WEATHER_CODE_LABELS[weatherCode] ?? 'Condição climática disponível'
}

export function mapPeriodLabel(isDay: boolean): string {
  return isDay ? 'Dia' : 'Noite'
}

export function transformWeatherData(data: WeatherApiResponse, cityName: string): WeatherCondition {
  const current = data.current

  return {
    city: cityName,
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    feelsLike: current.apparent_temperature,
    isDay: current.is_day === 1,
    windSpeed: current.wind_speed_10m,
    windDirection: current.wind_direction_10m,
    precipitationProbability: current.precipitation_probability,
    weatherCode: current.weather_code,
    weatherDescription: mapWeatherCode(current.weather_code),
    updatedAt: current.time,
  }
}
