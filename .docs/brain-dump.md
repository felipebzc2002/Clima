# Projeto clima

Este projeto vai pegar a cidade baseado nisso, consultar o clima daquela região , exibindo as principais informações de clima, temperatura, humidade e etc

### Aspectos Técnicos 

O projeto vai ser em vite + vanilla + Typescript


### Informações da API que vai ser utilizada 
ele vai usar a API openMeteo, com os seguintes endpoints:

#### para pegar a latitude, longitude e timezone, baseado no nome da cidade

https://geocoding-api.open-meteo.com/v1/search?name={nome-da-cidade}&count=1&language=pt&format=json

{NOME-DA-CIDADE} = nome da cidade que o usuário digitou 

exemplo de resposta: 
{
  "results": [
    {
      "id": 2950159,
      "name": "Berlim",
      "latitude": 52.52437,
      "longitude": 13.41053,
      "elevation": 74,
      "feature_code": "PPLC",
      "country_code": "DE",
      "admin1_id": 2950157,
      "admin3_id": 6547383,
      "admin4_id": 6547539,
      "timezone": "Europe/Berlin",
      "population": 3426354,
      "postcodes": [
        "10967",
        "13347"
      ],
      "country_id": 2921044,
      "country": "Alemanha",
      "admin1": "Berlim",
      "admin3": "Berlin, Stadt",
      "admin4": "Berlin"
    }
  ],
  "generationtime_ms": 0.55480003
}

informações q precisamos:
-Name 
-Latidude 
- longitude

#### para pegar o clima baseado na longitude e latitude
https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={lONGITUDE}&current=precipitation_probability,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,precipitation,wind_speed_10m,wind_direction_10m

{LATITUDE} = Latitude
{LONGITUDE} = longitude

exemplo de resposta:
{
  "latitude": 52.52,
  "longitude": 13.419998,
  "generationtime_ms": 0.142574310302734,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "precipitation_probability": "%",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "apparent_temperature": "°C",
    "is_day": "",
    "weather_code": "wmo code",
    "precipitation": "mm",
    "wind_speed_10m": "km/h",
    "wind_direction_10m": "°"
  },
  "current": {
    "time": "2026-07-03T18:30",
    "interval": 900,
    "precipitation_probability": 0,
    "temperature_2m": 19.5,
    "relative_humidity_2m": 47,
    "apparent_temperature": 16,
    "is_day": 1,
    "weather_code": 1,
    "precipitation": 0,
    "wind_speed_10m": 20.6,
    "wind_direction_10m": 297
  }
}

informações que precisamos:
- na resposta eu tenho 2 itens:
  "current_units": tem as unidades das propriedades 
- current tem os valores das propriedades 

Propriedades obrigatorias:
- temperature_2m
- relative_humidilty_2m
- apparent_temperature
- is_day
- wind_speed_10m
- wind_direction_10m
- precipitation_probability

#### inforamção importante:
Teremos um arquivo com as funções do openMeteo, para que o projeto não faça requisição direta a API, mas sim use as funções desse arquivo

Fluxo de pesquisa
- O usuaário digita o nome da cidade 
- O projeto pega o nome e usa o OpenMeteo para pegar a latitude e longitude dessa cidade
- Ao pegar a lagitude e longitude, o projeto deve usar essa informações para fazer a requisiçlão e pegar as informações dessa localização 
- Caso não ache as informações da cidade, se comportar como se não tivesse achado nada
- Caso ache as informações da cidade, mas não do clima, se comportar como se não tivesse achado nada

A busca envolve as duas requisições (buscar latitude/longitude + buscar clima), mas para o usuário é uma só (com o nome da cidade) com loading

As funções do openMeteo deve verificar se os parametros vieram 


### Aspectos visuais (design e UX)

Tem que ter Empty State

Teremos uma área SUPERIOR centralizada que tem apenas o campo de busca da cidade

o projeto tera um sidebar na esquerda com as sehguintes informações:
- Temperatura
- Dia atual
- Se é dia ou é noite (baseado no is_day)
- weather code

Design geral:
- O projeto terá um fundo escuro
- A parte Superior não terá background, mas tanto sidebar quanto a área principal ficarão dentro de uma div com borda bem arrendondada, fundo branco, centralizada e largura máxima de 800px

informações de interpretação sobre como interpretar o weather code

Code	     Description
0- 	         Clear sky
1, 2, 3-	 Mainly clear, partly cloudy, and overcast
45, 48-	     Fog and depositing rime fog
51, 53, 55-	 Drizzle: Light, moderate, and dense intensity
56, 57-	     Freezing Drizzle: Light and dense intensity
61, 63, 65-  Rain: Slight, moderate and heavy intensity
66, 67-	     Freezing Rain: Light and heavy intensity
71, 73, 75-	 Snow fall: Slight, moderate, and heavy intensity
77-	         Snow grains
80, 81, 82-	 Rain showers: Slight, moderate, and violent
85, 86-	     Snow showers slight and heavy
95 *-	     Thunderstorm: Slight or moderate
96, 99 *-	Thunderstorm with slight and heavy hail