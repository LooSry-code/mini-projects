import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
// const city = "London";
// const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

export const getWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = response.data;

    const weather = {
      description: data.weather[0].description,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      city: data.name,
      country: data.sys.country,
    };

    return weather;
  } catch (error) {
    const err = error as any;
    if (err.response && err.response.status === 404) {
      throw new Error("City not found");
    }
    throw new Error("Failed to fetch weather data");
  }
};
