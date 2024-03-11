export const getWeatherDescription = (weatherDescription) => {
    return `${weatherDescription.charAt(0).toUpperCase()}${weatherDescription.slice(1)}`
  }