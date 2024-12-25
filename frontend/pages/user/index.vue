<template>
  <div
    class="p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen"
  >
    <h1
      class="text-2xl md:text-3xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-3"
    >
      Dashboard Penghuni
    </h1>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- History Tagihan -->
      <div
        class="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-5 border border-gray-700"
      >
        <h2
          class="text-lg md:text-xl font-semibold mb-4 text-gray-100 flex items-center"
        >
          <span class="material-icons-outlined mr-2">receipt_long</span>
          History Tagihan
        </h2>
        <div class="overflow-y-auto max-h-[400px] scrollbar-thin">
          <ul class="divide-y divide-gray-700">
            <li
              v-for="(bill, index) in billingHistory"
              :key="index"
              class="py-4 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-center gap-2"
              >
                <div>
                  <p class="text-sm text-gray-400">{{ bill.date }}</p>
                  <p class="font-medium text-gray-100">
                    Rp {{ bill.total.toLocaleString("id-ID") }}
                  </p>
                </div>
                <span
                  :class="{
                    'px-3 py-1 rounded-full text-sm font-medium': true,
                    'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30':
                      bill.status === 'Lunas',
                    'bg-red-900/50 text-red-400 border border-red-500/30':
                      bill.status === 'Belum Lunas',
                  }"
                >
                  {{ bill.status }}
                </span>
              </div>
            </li>
          </ul>
          <p
            v-if="billingHistory.length === 0"
            class="text-gray-400 text-center py-4"
          >
            Belum ada history tagihan.
          </p>
        </div>
      </div>

      <!-- Layanan -->
      <div
        class="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-5 border border-gray-700"
      >
        <h2
          class="text-lg md:text-xl font-semibold mb-4 text-gray-100 flex items-center"
        >
          <span class="material-icons-outlined mr-2">grid_view</span>
          Layanan
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <router-link
            v-for="(link, index) in menuLinks"
            :key="index"
            :to="link.to"
            class="service-card"
          >
            <span class="material-icons-outlined text-2xl mb-2">{{
              link.icon
            }}</span>
            {{ link.text }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "UserDashboard",
  setup() {
    const billingHistory = ref([]);
    const errorMessage = ref("");

    const menuLinks = [
      { to: "/user/sewa", text: "Sewa Kamar", icon: "apartment" },
      { to: "/user/sewa/bayar", text: "Pembayaran", icon: "payments" },
      {
        to: "/user/laporan/fasilitas",
        text: "Laporan Fasilitas",
        icon: "build",
      },
      { to: "/user/laporan/penghuni", text: "Laporan Penghuni", icon: "group" },
    ];

    const fetchBillingHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transformasi data agar sesuai dengan template
        billingHistory.value = data.map((item) => ({
          total: item.bill,
          date: new Date(item.created_at).toLocaleDateString("id-ID"),
          status: item.bill > 10000000 ? "Lunas" : "Belum Lunas", // Sesuaikan logika status
        }));
      } catch (error) {
        errorMessage.value = "Gagal mengambil data tagihan. Silakan coba lagi.";
        console.error("Error fetching billing history:", error);
      }
    };

    onMounted(fetchBillingHistory);

    return { billingHistory, errorMessage, menuLinks };
  },
};
</script>

<style scoped>
.service-card {
  @apply flex flex-col items-center justify-center p-4 rounded-lg 
         bg-gray-700/50 text-gray-100
         transition-all duration-300 ease-in-out
         text-sm font-medium text-center
         border border-gray-600/50;
}

.service-card:hover {
  @apply transform -translate-y-1 shadow-md
         bg-gray-700 border-gray-500;
}

/* Custom Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  @apply bg-gray-700 rounded-full;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  @apply bg-gray-600 rounded-full;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}
</style>
