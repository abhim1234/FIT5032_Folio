// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import UserDashboard from '../views/UserDashboard.vue';
import FirebaseRegister from '../views/FirebaseRegisterView.vue';
import FirebaseSignin from '../views/FirebaseSigninView.vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import { ref } from 'vue'; // Import ref to create reactive state

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/admin-dashboard', name: 'admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/user-dashboard', name: 'user-dashboard', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: '/FireRegister', name: 'FirebaseRegister', component: FirebaseRegister },
  { path: '/FireLogin', name: 'FirebaseSignin', component: FirebaseSignin }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Reactive state for authentication
export const isAuthenticated = ref(false); // Define and export isAuthenticated

// Route guard to protect routes based on authentication and roles
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next('/FireLogin'); // Redirect to login if not authenticated
  } else if (requiresAuth && user) {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role; // Fetch the user's role from Firestore

        if (to.meta.role && userRole !== to.meta.role) {
          next('/'); // Redirect to home if the user does not have the required role
        } else {
          next(); // Proceed to the route
        }
      } else {
        console.error('No such user document in Firestore!');
        next('/'); // Redirect to home if no user document is found
      }
    } catch (error) {
      console.error('Error fetching user role from Firestore:', error);
      next('/'); // Redirect to home if there's an error
    }
  } else {
    next(); // Proceed normally if no authentication is required
  }
});

export default router;
