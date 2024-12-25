<template>
  <nav class="bg-gray-900 border-b border-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu toggle -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            @click="toggleMobileMenu"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open main menu</span>
            <span class="material-icons-outlined">
              {{ isMobileMenuOpen ? "close" : "menu" }}
            </span>
          </button>
        </div>

        <!-- Main navigation -->
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4 items-center">
              <router-link
                to="/"
                class="text-blue-400 font-bold text-xl px-3 py-1.5 flex items-center"
              >
                <span class="material-icons-outlined mr-2">apartment</span>
                P08
              </router-link>
              <router-link
                to="/"
                class="rounded-md px-3 py-2 text-sm font-medium transition-colors flex items-center"
                :class="{
                  'bg-gray-800 text-gray-100': $route.path === '/',
                  'text-gray-300 hover:bg-gray-800 hover:text-gray-100':
                    $route.path !== '/',
                }"
              >
                <span class="material-icons-outlined mr-2">home</span>
                Home
              </router-link>
              <router-link
                to="/facility"
                class="rounded-md px-3 py-2 text-sm font-medium transition-colors flex items-center"
                :class="{
                  'bg-gray-800 text-gray-100': $route.path === '/facility',
                  'text-gray-300 hover:bg-gray-800 hover:text-gray-100':
                    $route.path !== '/facility',
                }"
              >
                <span class="material-icons-outlined mr-2">meeting_room</span>
                Facility
              </router-link>
              <router-link
                to="/rules"
                class="rounded-md px-3 py-2 text-sm font-medium transition-colors flex items-center"
                :class="{
                  'bg-gray-800 text-gray-100': $route.path === '/rules',
                  'text-gray-300 hover:bg-gray-800 hover:text-gray-100':
                    $route.path !== '/rules',
                }"
              >
                <span class="material-icons-outlined mr-2">gavel</span>
                Rules
              </router-link>
            </div>
          </div>
        </div>

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div class="flex items-center">
            <p class="text-gray-300 mx-5 hidden md:block">
              Hello,
              <span class="text-gray-100 font-medium">{{ userName }}</span>
              <span class="text-gray-400">({{ userRole.toUpperCase() }})</span>
            </p>
            <button
              type="button"
              @click="toggleDropdown"
              class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open user menu</span>
              <div
                class="size-8 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <span class="material-icons-outlined text-gray-300"
                  >person</span
                >
              </div>
            </button>
          </div>
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              <span class="material-icons-outlined mr-2">person_outline</span>
              Your Profile
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              <span class="material-icons-outlined mr-2">settings</span>
              Settings
            </a>
            <a
              href="/"
              class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              @click="handleSignOut"
            >
              <span class="material-icons-outlined mr-2">logout</span>
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link
          v-for="item in mobileMenuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center rounded-md px-3 py-2 text-base font-medium transition-colors"
          :class="{
            'bg-gray-800 text-gray-100': $route.path === item.path,
            'text-gray-300 hover:bg-gray-800 hover:text-gray-100':
              $route.path !== item.path,
          }"
        >
          <span class="material-icons-outlined mr-2">{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/store";

export default {
  setup() {
    const isDropdownOpen = ref(false);
    const isMobileMenuOpen = ref(false);
    const userStore = useUserStore();

    const mobileMenuItems = [
      { name: "Home", path: "/", icon: "home" },
      { name: "Facility", path: "/facility", icon: "meeting_room" },
      { name: "Rules", path: "/rules", icon: "gavel" },
    ];

    const userName = computed(
      () => localStorage.getItem("username") || "Guest"
    );
    const userRole = computed(() => localStorage.getItem("role") || "GUEST");

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const handleSignOut = () => {
      userStore.clearUser();
    };

    return {
      userName,
      userRole,
      isDropdownOpen,
      isMobileMenuOpen,
      mobileMenuItems,
      toggleDropdown,
      toggleMobileMenu,
      handleSignOut,
    };
  },
};
</script>
