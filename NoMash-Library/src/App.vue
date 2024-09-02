<!-- src/App.vue -->
<template>
  <div class="main-container">
    <header class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/FireLogin">My App</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                :class="['mx-2', isActiveLink('/FireRegister') ? 'btn btn-primary active-link' : 'inactive-link']"
                to="/FireRegister" exact
              >
                Register (Week 6)
              </router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link
                :class="['mx-2', isActiveLink('/FireLogin') ? 'btn btn-primary active-link' : 'inactive-link']"
                to="/FireLogin"
              >
                Login
              </router-link>
            </li>
            <li v-else class="nav-item">
              <button @click="logout" class="btn btn-danger mx-2">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="flex-grow-1 d-flex align-items-center justify-content-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isAuthenticated } from './router'; // Correctly import isAuthenticated

const router = useRouter();
const route = useRoute();

const isActiveLink = (path) => {
  if (path === '/about') {
    return route.path === '/about' || route.path === '/access-denied';
  } else {
    return route.path === path;
  }
};

const logout = () => {
  isAuthenticated.value = false; // Update authentication state
  router.push('/FireLogin'); // Redirect to login page
};
</script>

<style>
/* Main container styling */
.main-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1; /* Allows main to grow and fill available space */
  display: flex;
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  text-align: center; /* Center-align text within the main area */
}

.login-container {
  display: flex;
  flex-direction: column; /* Display elements in a column */
  align-items: center; /* Center elements horizontally */
  width: 100%; /* Ensure it doesn't shrink */
  max-width: 400px; /* Optional: limit max width */
}

/* Additional styles for form elements and cards */
.login-form {
  display: flex;
  flex-direction: column; /* Stack inputs vertically */
  gap: 15px; /* Space between form elements */
  align-items: center; /* Center items horizontally */
}

input {
  padding: 8px;
  width: 100%; /* Full width within container */
  max-width: 300px; /* Max width for better appearance */
  margin-bottom: 10px; /* Add space between input fields */
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Navbar styling */
header {
  background-color: #343a40;
  color: white;
}

.navbar {
  justify-content: center; /* Center-align items horizontally */
}

.navbar-nav {
  display: flex; /* Use flexbox for alignment */
  justify-content: center; /* Center-align items within the navbar */
  flex-direction: row; /* Ensure items are in a row */
  width: 100%; /* Take full width of the navbar */
}

/* Consistent link and button styling */
.inactive-link,
.active-link {
  padding: 8px 16px; /* Same padding for both states */
  border-radius: 5px; /* Same rounded corners for both states */
  display: inline-block; /* Ensure the links are treated the same as buttons */
}

/* Active button styling */
.btn-primary.active-link {
  background-color: #0d6efd; /* Bootstrap primary blue */
  color: white; /* White text */
  border: none; /* Remove any default border */
}

/* Inactive link styling */
.inactive-link {
  color: #0d6efd; /* Blue text for inactive links */
  background-color: transparent; /* No background color */
  text-decoration: none; /* Remove underline */
}

.inactive-link:hover {
  color: #0a58ca; /* Slightly darker blue on hover */
  text-decoration: none; /* No underline on hover */
}

/* Styles for AccessDeniedView and other components */
.access-denied {
  text-align: center;
  padding: 50px;
}

</style>