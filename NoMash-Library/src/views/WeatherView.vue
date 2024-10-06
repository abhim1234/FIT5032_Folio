<template>
  <div>
    <h1 style="text-align: center;">WEATHER APP</h1>
    
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name"
        style="padding: 10px; font-size: 16px; width: 200px; border-radius: 5px; border: 1px solid #000;"
      />
      <button 
        @click="searchByCity"
        style="padding: 10px; font-size: 16px; width: 200px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;"
      >
        Search
      </button>
    </div>

    <div v-if="weatherData" style="text-align: center;">
      <h2>
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" v-if="iconUrl" />
        <p>{{ temperature }} °C</p>
      </div>
      <p>{{ weatherData.weather[0].description }}</p>
    </div>
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
