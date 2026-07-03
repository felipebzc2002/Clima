export type WeatherCondition = {
  city: string
  temperature: number
  humidity: number
  feelsLike: number
  isDay: boolean
  windSpeed: number
  windDirection: number
  precipitationProbability: number
  weatherCode: number
  weatherDescription: string
  updatedAt: string
}

export type WeatherApiResponse = {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    is_day: number
    wind_speed_10m: number
    wind_direction_10m: number
    precipitation_probability: number
    weather_code: number
    time: string
  }
  current_units: {
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    is_day: string
    wind_speed_10m: string
    wind_direction_10m: string
    precipitation_probability: string
    weather_code: string
    time: string
  }
}

export type CitySearchResult = {
  name: string
  latitude: number
  longitude: number
  timezone?: string
}

export type CitySearchApiResponse = {
  results?: Array<{
    name: string
    latitude: number
    longitude: number
    timezone?: string
  }>
}
