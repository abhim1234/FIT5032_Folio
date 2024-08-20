<!-- src/App.vue -->
<template>
  <div class="main-container">
    <header class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">My App</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                :class="['mx-2', isActiveLink('/') ? 'btn btn-primary active-link' : 'inactive-link']"
                to="/" exact
              >
                Home (Week 5)
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :class="['mx-2', isActiveLink('/about') ? 'btn btn-primary active-link' : 'inactive-link']"
                to="/about"
              >
                About
              </router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link
                :class="['mx-2', isActiveLink('/login') ? 'btn btn-primary active-link' : 'inactive-link']"
                to="/login"
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
    <main class="container mt-5">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isAuthenticated } from './router'; // Ensure this import

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
  router.push('/login'); // Redirect to login page
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

/* Additional styles for form elements and cards */
.form {
  text-align: center;
  margin-top: 50px;
}

#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #343a40;
  color: white;
}

.navbar-brand {
  font-weight: bold;
}

.nav-link {
  color: white;
  margin: 0 10px;
}

.nav-link.active {
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

.btn-danger {
  margin-left: 10px;
}

/* Style from AboutView */
.about-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center-align horizontally */
    text-align: center;  /* Center-align text */
    margin: 20px auto;   /* Center container horizontally and add margin */
    max-width: 800px;    /* Optional: Limit the maximum width */
  }
  
  h1 {
    margin-bottom: 20px; /* Space below the heading */
  }
  
  p {
    line-height: 1.6; /* Improve readability */
  }

  /* Style from LogintView */
  .login-container {
  max-width: 400px;
  margin: auto; /* Center-align horizontally */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center-align text */
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between form elements */
}

h1 {
  margin-bottom: 20px; /* Add space below the heading */
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

/* Style from AccessDeniedView */
.access-denied {
  text-align: center;
  padding: 50px;
}
</style>
