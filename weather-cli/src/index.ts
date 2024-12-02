import readline from "readline";
import { getWeather } from "./weather";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mainMenu = () => {
  rl.question(
    `Enter city name to get weather information or type "exit" to quit: `,
    async (city) => {
      if (city.toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }

      try {
        const weather = await getWeather(city);
        console.log(`Weather in ${weather.city},${weather.country}:`);
        console.log(`Description: ${weather.description}`);
        console.log(`Temperature: ${weather.temperature}°C`);
        console.log(`Feels like: ${weather.feels_like}°C`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind speed: ${weather.wind_speed} m/s`);
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log("City not found");
          }
          throw new Error(`Error.response.status: ${error.response.status}`);
        } else if (error.request) {
          throw new Error(`Error.request: ${error.request}`);
        } else {
          throw new Error(`Error: ${error.message}`);
        }
      }
      mainMenu();
    }
  );
};

mainMenu();
