<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800"
  >
    <div
      class="w-full max-w-md bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-700"
    >
      <h1
        class="text-4xl font-bold text-center mb-8 text-gray-100 flex items-center justify-center"
      >
        <span class="material-icons-outlined mr-3 text-blue-400">login</span>
        Login
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div
          v-if="errorMessage"
          class="p-4 mb-4 text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg text-sm flex items-center"
        >
          <span class="material-icons-outlined mr-2">error</span>
          {{ errorMessage }}
        </div>

        <!-- Username Field -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-300 mb-2"
          >
            Username
          </label>
          <div class="relative">
            <span
              class="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              person
            </span>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full bg-gray-700 border border-gray-600 text-gray-100 pl-10 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div class="relative">
            <span
              class="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              lock
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full bg-gray-700 border border-gray-600 text-gray-100 pl-10 pr-12 py-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            >
              <span class="material-icons-outlined">
                {{ showPassword ? "visibility_off" : "visibility" }}
              </span>
            </button>
          </div>
        </div>

        <!-- Role Field -->
        <div>
          <label
            for="role"
            class="block text-sm font-medium text-gray-300 mb-2"
          >
            Role
          </label>
          <div class="relative">
            <span
              class="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              badge
            </span>
            <select
              id="role"
              v-model="role"
              class="w-full bg-gray-700 border border-gray-600 text-gray-100 pl-10 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
              required
            >
              <option value="" disabled selected class="bg-gray-700">
                Select your role
              </option>
              <option value="USER" class="bg-gray-700">User</option>
              <option value="ADMIN" class="bg-gray-700">Admin</option>
            </select>
            <span
              class="material-icons-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            >
              expand_more
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span class="material-icons-outlined">login</span>
          <span>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginPage",
  setup() {
    const username = ref("");
    const password = ref("");
    const role = ref("");
    const errorMessage = ref(null);
    const showPassword = ref(false);
    const userStore = useUserStore();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            role: role.value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to login";
          return;
        }

        const data = await response.json();
        userStore.setUser(username.value, role.value);

        localStorage.setItem("username", username.value);
        localStorage.setItem("role", role.value);
        localStorage.setItem("token", data.token);

        // Redirect based on role
        if (role.value.toUpperCase() === "USER") {
          window.location.href = "/user";
        } else if (role.value.toUpperCase() === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else {
          errorMessage.value = "Invalid role provided.";
        }
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    return {
      username,
      password,
      role,
      errorMessage,
      showPassword,
      togglePasswordVisibility,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Custom select styling */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Remove default focus outline and add custom one */
input:focus,
select:focus {
  outline: none;
}
</style>
