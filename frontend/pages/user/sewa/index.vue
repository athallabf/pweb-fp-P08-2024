<template>
  <div class="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
    <RouterLink
      to="/user"
      class="inline-flex items-center mb-6 text-gray-300 hover:text-gray-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Dashboard
    </RouterLink>

    <h1 class="text-3xl font-bold mb-6 text-gray-100">Sewa Kamar</h1>

    <!-- Spesifikasi Kamar -->
    <div
      class="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2">apartment</span>
        Spesifikasi Kamar
      </h2>
      <ul class="space-y-2 text-gray-300">
        <li class="flex items-center">
          <span class="material-icons-outlined mr-2 text-gray-400"
            >square_foot</span
          >
          Luas Kamar: 4x5 meter
        </li>
        <li class="flex items-center">
          <span class="material-icons-outlined mr-2 text-gray-400">hotel</span>
          Fasilitas: TV, Meja Belajar, Kursi Belajar, Tempat Tidur Queen
        </li>
      </ul>
    </div>

    <!-- Pilihan Periode Sewa -->
    <div
      class="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2">date_range</span>
        Pilih Periode Sewa
      </h2>
      <div class="flex items-center space-x-4">
        <label class="flex items-center text-gray-300 cursor-pointer">
          <input
            type="radio"
            :value="3"
            v-model="rentalPeriod"
            class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
          />
          <span class="ml-2">3 Bulan</span>
        </label>
        <label class="flex items-center text-gray-300 cursor-pointer">
          <input
            type="radio"
            :value="6"
            v-model="rentalPeriod"
            class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
          />
          <span class="ml-2">6 Bulan</span>
        </label>
      </div>
    </div>

    <!-- Fitur Tambahan -->
    <div
      class="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2">add_circle</span>
        Fitur Tambahan
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Laundry -->
        <div class="space-y-3">
          <h3 class="text-gray-100 font-medium flex items-center">
            <span class="material-icons-outlined mr-2 text-blue-400"
              >local_laundry_service</span
            >
            Laundry
          </h3>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              :value="3"
              v-model="selectedFeatures.laundry"
              class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
              name="laundry"
            />
            <span class="ml-2">3 Bulan - Rp 600.000</span>
          </label>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              :value="6"
              v-model="selectedFeatures.laundry"
              class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
              name="laundry"
            />
            <span class="ml-2">6 Bulan - Rp 1.200.000</span>
          </label>
        </div>

        <!-- Cleaning Service -->
        <div class="space-y-3">
          <h3 class="text-gray-100 font-medium flex items-center">
            <span class="material-icons-outlined mr-2 text-blue-400"
              >cleaning_services</span
            >
            Cleaning Service
          </h3>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              :value="3"
              v-model="selectedFeatures.cleaning"
              class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
              name="cleaning"
            />
            <span class="ml-2">3 Bulan - Rp 300.000</span>
          </label>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              :value="6"
              v-model="selectedFeatures.cleaning"
              class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
              name="cleaning"
            />
            <span class="ml-2">6 Bulan - Rp 600.000</span>
          </label>
        </div>

        <!-- Catering -->
        <div class="space-y-3">
          <h3 class="text-gray-100 font-medium flex items-center">
            <span class="material-icons-outlined mr-2 text-blue-400"
              >restaurant</span
            >
            Catering
          </h3>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              :value="3"
              v-model="selectedFeatures.catering"
              class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
              name="catering"
            />
            <span class="ml-2">3 Bulan - Rp 3.000.000</span>
          </label>
          <label class="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              :value="6"
              v-model="selectedFeatures.catering"
              class="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
              name="catering"
            />
            <span class="ml-2">6 Bulan - Rp 6.000.000</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Menampilkan Harga -->
    <div
      class="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
        <span class="material-icons-outlined mr-2">receipt_long</span>
        Rincian Harga
      </h2>
      <div class="space-y-3 text-gray-300">
        <p class="flex justify-between">
          <span>Harga Kamar:</span>
          <span class="font-medium text-gray-100"
            >Rp {{ roomCost.toLocaleString() }}</span
          >
        </p>
        <p class="flex justify-between">
          <span>Harga Laundry:</span>
          <span class="font-medium text-gray-100"
            >Rp {{ laundryCost.toLocaleString() }}</span
          >
        </p>
        <p class="flex justify-between">
          <span>Harga Cleaning Service:</span>
          <span class="font-medium text-gray-100"
            >Rp {{ cleaningCost.toLocaleString() }}</span
          >
        </p>
        <p class="flex justify-between">
          <span>Harga Catering:</span>
          <span class="font-medium text-gray-100"
            >Rp {{ cateringCost.toLocaleString() }}</span
          >
        </p>
        <div class="border-t border-gray-700 pt-3 mt-3">
          <p class="flex justify-between text-lg">
            <strong class="text-gray-100">Total Biaya:</strong>
            <strong class="text-blue-400"
              >Rp {{ totalCost.toLocaleString() }}</strong
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Tombol Navigasi -->
    <div class="flex justify-end">
      <router-link
        :to="{
          path: '/user/sewa/bayar',
          query: {
            period: rentalPeriod,
            total: totalCost,
          },
        }"
        class="inline-flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': !rentalPeriod }"
        :disabled="!rentalPeriod"
      >
        <span class="material-icons-outlined mr-2">arrow_forward</span>
        Lanjutkan ke Pembayaran
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "SewaKamar",
  setup() {
    const rentalPeriod = ref(null);
    const selectedFeatures = ref({
      laundry: null,
      cleaning: null,
      catering: null,
    });

    const prices = {
      room: { 3: 6000000, 6: 12000000 },
      laundry: { 3: 600000, 6: 1200000 },
      cleaning: { 3: 300000, 6: 600000 },
      catering: { 3: 3000000, 6: 6000000 },
    };

    const roomCost = computed(() => {
      return rentalPeriod.value ? prices.room[rentalPeriod.value] : 0;
    });

    const laundryCost = computed(() => {
      return selectedFeatures.value.laundry
        ? prices.laundry[selectedFeatures.value.laundry]
        : 0;
    });

    const cleaningCost = computed(() => {
      return selectedFeatures.value.cleaning
        ? prices.cleaning[selectedFeatures.value.cleaning]
        : 0;
    });

    const cateringCost = computed(() => {
      return selectedFeatures.value.catering
        ? prices.catering[selectedFeatures.value.catering]
        : 0;
    });

    const totalCost = computed(() => {
      return (
        roomCost.value +
        laundryCost.value +
        cleaningCost.value +
        cateringCost.value
      );
    });

    return {
      rentalPeriod,
      selectedFeatures,
      roomCost,
      laundryCost,
      cleaningCost,
      cateringCost,
      totalCost,
    };
  },
};
</script>

<style scoped>
.form-radio {
  @apply w-4 h-4 cursor-pointer;
}

.form-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}

/* Remove default radio button styles */
input[type="radio"] {
  @apply border-gray-600 bg-gray-700;
}

/* Custom focus styles */
input[type="radio"]:focus {
  @apply ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500;
}
</style>
