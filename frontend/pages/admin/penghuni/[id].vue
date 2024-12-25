<template>
  <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
    <!-- Back Button -->
    <RouterLink
      to="/admin/dashboard"
      class="inline-flex items-center mb-6 text-gray-300 hover:text-gray-100 transition-colors"
    >
      <span class="material-icons-outlined mr-2">arrow_back</span>
      Back to Dashboard
    </RouterLink>

    <h1 class="text-3xl font-bold mb-6 text-gray-100 flex items-center">
      <span class="material-icons-outlined mr-3">person</span>
      Detail Penghuni
    </h1>

    <div
      v-if="errorMessage"
      class="mb-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400"
    >
      <div class="flex items-center">
        <span class="material-icons-outlined mr-2">error</span>
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="userDetail" class="space-y-6">
      <!-- User Info -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
          <span class="material-icons-outlined mr-2">badge</span>
          Informasi Penghuni
        </h2>
        <div class="space-y-3">
          <p class="text-gray-300">
            <span class="font-medium text-gray-100">Username:</span>
            {{ userDetail.user.username }}
          </p>
          <p class="text-gray-300">
            <span class="font-medium text-gray-100">Role:</span>
            <span
              class="ml-2 px-2 py-1 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded-full text-sm"
            >
              {{ userDetail.user.role }}
            </span>
          </p>
        </div>
      </div>

      <!-- Invoice History -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
          <span class="material-icons-outlined mr-2">receipt_long</span>
          Riwayat Tagihan
        </h2>
        <div v-if="userDetail.invoice_history" class="space-y-3">
          <p class="text-gray-300">
            <span class="font-medium text-gray-100">Total Tagihan:</span>
            Rp {{ userDetail.invoice_history.bill.toLocaleString("id-ID") }}
          </p>
          <p class="text-gray-300">
            <span class="font-medium text-gray-100">Tanggal:</span>
            {{ formatDate(userDetail.invoice_history.created_at) }}
          </p>
        </div>
        <p v-else class="text-gray-400">Tidak ada riwayat tagihan</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4">
        <button
          @click="removeUser"
          class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
        >
          <span class="material-icons-outlined">delete</span>
          <span>Hapus Penghuni</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UserDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userDetail = ref(null);
    const errorMessage = ref(null);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        const response = await fetch(
          `http://localhost:5000/admin/penghuni/${route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal mengambil data penghuni");
        }

        userDetail.value = await response.json();
      } catch (error) {
        console.error("Error fetching user details:", error);
        errorMessage.value =
          error.message || "Terjadi kesalahan saat mengambil data";
      }
    };

    const removeUser = async () => {
      if (!confirm("Apakah Anda yakin ingin menghapus penghuni ini?")) return;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        const response = await fetch(
          `http://localhost:5000/admin/penghuni/${route.params.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus penghuni");
        }

        alert("Penghuni berhasil dihapus");
        router.push("/admin/dashboard");
      } catch (error) {
        console.error("Error removing user:", error);
        errorMessage.value =
          error.message || "Terjadi kesalahan saat menghapus penghuni";
      }
    };

    onMounted(fetchUserDetail);

    return {
      userDetail,
      errorMessage,
      formatDate,
      removeUser,
    };
  },
};
</script>
