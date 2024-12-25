<template>
  <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-100 flex items-center">
      <span class="material-icons-outlined mr-3">build</span>
      Laporan Fasilitas
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

    <div v-if="reports.length === 0" class="text-gray-400 text-center py-8">
      Tidak ada laporan fasilitas
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="report in reports"
        :key="report._id"
        class="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-colors"
      >
        <div class="flex items-start justify-between">
          <div class="space-y-3">
            <div class="flex items-center text-gray-300">
              <span class="material-icons-outlined mr-2">person</span>
              <span class="font-medium text-gray-100">{{
                report.user.username
              }}</span>
            </div>
            <p class="text-gray-300">
              <span class="font-medium text-gray-100">Pesan:</span>
              {{ report.message }}
            </p>
            <p class="text-sm text-gray-400">
              <span
                class="material-icons-outlined mr-1 text-sm align-text-bottom"
                >schedule</span
              >
              {{ formatDate(report.createdAt) }}
            </p>
          </div>
          <div
            class="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded-full text-sm"
          >
            Fasilitas
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "LaporanFasilitas",
  setup() {
    const reports = ref([]);
    const errorMessage = ref(null);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        const response = await fetch(
          "http://localhost:5000/admin/laporan/fasilitas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal mengambil data laporan");
        }

        reports.value = await response.json();
      } catch (error) {
        console.error("Error fetching reports:", error);
        errorMessage.value =
          error.message || "Terjadi kesalahan saat mengambil data";
      }
    };

    onMounted(fetchReports);

    return {
      reports,
      errorMessage,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
