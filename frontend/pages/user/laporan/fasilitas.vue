<template>
  <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
    <!-- Back Button -->
    <RouterLink
      to="/user"
      class="inline-flex items-center mb-6 text-gray-300 hover:text-gray-100 transition-colors"
    >
      <span class="material-icons-outlined mr-2">arrow_back</span>
      Back to Dashboard
    </RouterLink>

    <h1 class="text-3xl font-bold mb-6 text-gray-100">Laporan Fasilitas</h1>

    <!-- Form Laporan -->
    <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2">build</span>
        Form Laporan Kerusakan
      </h2>

      <form @submit.prevent="submitReport" class="space-y-6">
        <!-- Message Input -->
        <div>
          <label for="message" class="block text-gray-300 font-medium mb-2">
            Deskripsi Kerusakan
          </label>
          <textarea
            id="message"
            v-model="message"
            rows="4"
            class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Jelaskan detail kerusakan yang perlu diperbaiki..."
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          :disabled="isSubmitting"
        >
          <span class="material-icons-outlined">send</span>
          <span>{{ isSubmitting ? "Mengirim..." : "Kirim Laporan" }}</span>
        </button>

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg text-emerald-400 flex items-center"
        >
          <span class="material-icons-outlined mr-2">check_circle</span>
          Laporan berhasil dikirim!
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 flex items-center"
        >
          <span class="material-icons-outlined mr-2">error</span>
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "FacilityReport",
  setup() {
    const message = ref("");
    const isSubmitting = ref(false);
    const showSuccess = ref(false);
    const error = ref("");

    const submitReport = async () => {
      if (!message.value.trim()) {
        error.value = "Mohon isi deskripsi kerusakan";
        return;
      }

      isSubmitting.value = true;
      error.value = "";
      showSuccess.value = false;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const response = await fetch(
          "http://localhost:5000/user/laporan/fasilitas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message: message.value }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal mengirim laporan");
        }

        message.value = "";
        showSuccess.value = true;
        setTimeout(() => {
          showSuccess.value = false;
        }, 3000);
      } catch (err) {
        console.error("Error submitting report:", err);
        error.value = err.message || "Terjadi kesalahan saat mengirim laporan";
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      message,
      isSubmitting,
      showSuccess,
      error,
      submitReport,
    };
  },
};
</script>

<style scoped>
/* Styling tambahan untuk tampilan form */
</style>
