<template>
  <div class="p-6 bg-sky-200 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-sky-700 flex items-center">
      <span class="material-icons-outlined mr-3 text-sky-700">dashboard</span>
      Dashboard Admin
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Room Occupancy Stats -->
      <div class="bg-sky-100 rounded-xl shadow-lg p-5">
        <h2 class="text-xl font-semibold mb-4 text-sky-700 flex items-center">
          <span class="material-icons-outlined mr-2 text-sky-700"
            >apartment</span
          >
          Room Occupancy
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="bg-green-900/30 rounded-lg p-4 border border-green-500/30"
          >
            <p class="text-teal-900 text-sm mb-1">Empty Rooms</p>
            <p class="text-2xl font-bold text-teal-900">
              {{ roomOccupancy.empty }}
            </p>
          </div>
          <div class="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
            <p class="text-sky-900 text-sm mb-1">Filled Rooms</p>
            <p class="text-2xl font-bold text-sky-900">
              {{ roomOccupancy.filled }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Navigation -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
          <span class="material-icons-outlined mr-2 text-blue-400">speed</span>
          Quick Access
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <router-link
            to="/admin/laporan/fasilitas"
            class="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <span
              class="material-icons-outlined text-gray-400 group-hover:text-blue-400 mr-2"
            >
              build
            </span>
            <span class="text-gray-300 group-hover:text-gray-100"
              >Laporan Fasilitas</span
            >
          </router-link>
          <router-link
            to="/admin/laporan/penghuni"
            class="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <span
              class="material-icons-outlined text-gray-400 group-hover:text-blue-400 mr-2"
            >
              people
            </span>
            <span class="text-gray-300 group-hover:text-gray-100"
              >Laporan Penghuni</span
            >
          </router-link>
        </div>
      </div>
    </div>

    <!-- Room List -->
    <div
      class="bg-gray-800 rounded-xl shadow-lg p-5 mb-8 border border-gray-700"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2 text-blue-400"
          >meeting_room</span
        >
        Room List
      </h2>
      <div
        v-if="errorMessageRooms"
        class="p-4 mb-4 text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg"
      >
        {{ errorMessageRooms }}
      </div>
      <div v-if="rooms.length === 0" class="text-gray-400 text-center py-8">
        No rooms available
      </div>
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          v-for="room in rooms"
          :key="room._id"
          class="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="material-icons-outlined text-gray-400"
              >door_front</span
            >
            <span
              :class="{
                'px-2 py-1 text-xs rounded-full': true,
                'bg-green-900/50 text-green-400 border border-green-500/30':
                  room.status === 'EMPTY',
                'bg-red-900/50 text-red-400 border border-red-500/30':
                  room.status === 'FILLED',
              }"
            >
              {{ room.status }}
            </span>
          </div>
          <p class="text-lg font-medium text-gray-100">
            Room {{ room.room_number }}
          </p>
        </div>
      </div>
    </div>

    <!-- Registered Users -->
    <div class="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2 text-blue-400">group</span>
        Registered Users
      </h2>
      <div
        v-if="errorMessage"
        class="p-4 mb-4 text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg"
      >
        {{ errorMessage }}
      </div>
      <div v-if="users.length === 0" class="text-gray-400 text-center py-8">
        No registered users
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="user in users"
          :key="user._id"
          @click="goToUserDetails(user._id)"
          class="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg"
        >
          <div class="flex items-center space-x-3">
            <div class="bg-gray-600 rounded-full p-2">
              <span class="material-icons-outlined text-gray-300">person</span>
            </div>
            <div>
              <p class="font-medium text-gray-100">{{ user.username }}</p>
              <p class="text-sm text-gray-400">
                User ID: {{ user._id.slice(-4) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AdminDashboard",
  setup() {
    const roomOccupancy = ref({ empty: 0, filled: 0 });
    const users = ref([]);
    const rooms = ref([]);
    const errorMessage = ref(null);
    const errorMessageRooms = ref(null);
    const router = useRouter();

    const fetchRoomOccupancy = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value =
            errorData.message || "Failed to fetch room occupancy";
          return;
        }

        const data = await response.json();
        roomOccupancy.value = data[0]; // Asumsi data berupa array dengan satu objek
      } catch (error) {
        errorMessage.value = "An error occurred while fetching room occupancy.";
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to fetch users";
          return;
        }

        users.value = await response.json();
      } catch (error) {
        errorMessage.value = "An error occurred while fetching users.";
      }
    };

    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/rooms", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessageRooms.value =
            errorData.message || "Failed to fetch rooms";
          return;
        }

        rooms.value = await response.json();
      } catch (error) {
        errorMessageRooms.value = "An error occurred while fetching rooms.";
      }
    };

    const goToUserDetails = (id) => {
      router.push(`/admin/penghuni/${id}`);
    };

    onMounted(() => {
      fetchRoomOccupancy();
      fetchUsers();
      fetchRooms();
    });

    return {
      roomOccupancy,
      users,
      rooms,
      errorMessage,
      errorMessageRooms,
      goToUserDetails,
    };
  },
};
</script>

<style scoped>
.material-icons-outlined {
  font-size: 24px;
}
</style>
