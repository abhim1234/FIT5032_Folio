<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div class="weather-info">
        <img :src="iconUrl" alt="Weather Icon" v-if="iconUrl" class="weather-icon" />
        <p class="temperature">{{ temperature }} °C</p>
      </div>
      <span class="description">{{ weatherData.weather[0].description }}</span>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? this.weatherData.main.temp : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
    apiKey() {
      return import.meta.env.VITE_WEATHER_API_KEY; // Ensure the API key is correctly configured
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async searchByCity() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
      await this.fetchWeatherData(url);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.weather-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.temperature {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.description {
  font-size: 1.2rem;
  color: #555;
}

main {
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}
</style>
