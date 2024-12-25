<template>
  <div
    v-if="!isValidAccess"
    class="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen"
  >
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-100 mb-4">Akses Tidak Valid</h1>
      <p class="text-gray-300 mb-6">
        Silakan pilih kamar dan periode sewa terlebih dahulu.
      </p>
      <router-link
        to="/user/sewa"
        class="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <span class="material-icons-outlined mr-2">arrow_back</span>
        Kembali ke Halaman Sewa
      </router-link>
    </div>
  </div>
  <div v-else>
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
      <h1 class="text-3xl font-bold mb-6 text-gray-100">Pembayaran</h1>

      <!-- Detail Pembayaran -->
      <div
        class="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
          <span class="material-icons-outlined mr-2">receipt</span>
          Detail Perhitungan
        </h2>
        <p class="text-gray-300">
          <strong class="text-gray-100">Periode Sewa:</strong>
          {{ rentalDetails.period }} bulan
        </p>
        <p class="text-gray-300">
          <strong class="text-gray-100">Total Biaya Seluruhnya:</strong> Rp
          {{ formatCurrency(rentalDetails.total) }}
        </p>
      </div>

      <!-- Status Pembayaran -->
      <div
        v-if="showPaymentStatus"
        class="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 border border-gray-700"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
          <span class="material-icons-outlined mr-2">payments</span>
          Status Pembayaran
        </h2>
        <p class="text-gray-300">
          <strong class="text-gray-100">Tanggal Pembayaran:</strong>
          {{ formattedPaymentDate }}
        </p>
        <p class="text-gray-300">
          <strong class="text-gray-100">Status:</strong>
          <span
            :class="{
              'px-3 py-1 rounded-full text-sm font-medium ml-2': true,
              'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30':
                paymentStatus?.status === 'Lunas',
              'bg-red-900/50 text-red-400 border border-red-500/30':
                paymentStatus?.status === 'Belum Lunas',
            }"
          >
            {{ paymentStatus?.status || "Belum Lunas" }}
          </span>
        </p>

        <!-- Tombol Download Invoice -->
        <div class="mt-6 space-y-4">
          <button
            v-if="paymentStatus?.status === 'Lunas' && invoiceUrl"
            @click="downloadInvoice"
            class="w-full md:w-auto bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            :disabled="isDownloading"
          >
            <span class="material-icons-outlined">
              {{ isDownloading ? "hourglass_top" : "download" }}
            </span>
            <span>{{
              isDownloading ? "Downloading..." : "Download Invoice PDF"
            }}</span>
          </button>

          <!-- Error Message -->
          <div
            v-if="downloadError"
            class="p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center"
          >
            <span class="material-icons-outlined mr-2">error</span>
            {{ downloadError }}
          </div>
        </div>
      </div>

      <!-- Form Pembayaran -->
      <div
        v-if="!paymentStatus || paymentStatus.status === 'Belum Lunas'"
        class="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-100 flex items-center">
          <span class="material-icons-outlined mr-2">payment</span>
          Form Pembayaran
        </h2>
        <form @submit.prevent="submitPayment" class="space-y-6">
          <!-- Pilihan Metode Pembayaran -->
          <div>
            <label class="block text-gray-300 font-medium mb-2"
              >Metode Pembayaran</label
            >
            <select
              v-model="paymentMethod"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="" disabled class="bg-gray-700">
                Pilih Metode Pembayaran
              </option>
              <option value="QRIS" class="bg-gray-700">QRIS</option>
              <option value="BANK_TRANSFER" class="bg-gray-700">
                Transfer Bank
              </option>
            </select>
          </div>

          <!-- Input Nama Bank -->
          <div v-if="paymentMethod === 'BANK_TRANSFER'">
            <label class="block text-gray-300 font-medium mb-2"
              >Nama Bank</label
            >
            <input
              type="text"
              v-model="bankName"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Masukkan nama bank"
              required
            />
          </div>

          <!-- Tombol Submit -->
          <button
            type="submit"
            class="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            :disabled="!paymentMethod"
            :class="{ 'opacity-50 cursor-not-allowed': !paymentMethod }"
          >
            <span class="material-icons-outlined mr-2">check_circle</span>
            Submit Pembayaran
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UserPayment",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const paymentMethod = ref("");
    const bankName = ref("");
    const paymentStatus = ref(null);
    const invoiceUrl = ref(null);
    const isLoading = ref(true);
    const isDownloading = ref(false);
    const downloadError = ref(null);

    // State untuk menyimpan detail sewa
    const rentalDetails = ref({
      period: 0,
      total: 0,
    });

    // Computed properties untuk formatting
    const showPaymentStatus = computed(() => !isLoading.value);

    const formattedPaymentDate = computed(() => {
      if (!paymentStatus.value?.created_at) return "-";
      try {
        return new Date(paymentStatus.value.created_at).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }
        );
      } catch {
        return "-";
      }
    });

    const formattedBill = computed(() => {
      if (!paymentStatus.value?.bill) return "Rp -";
      return `Rp ${formatCurrency(paymentStatus.value.bill)}`;
    });

    // Format currency
    const formatCurrency = (value) => {
      if (!value) return "0";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Mengambil data pembayaran saat komponen dimount
    onMounted(async () => {
      try {
        const queryParams = route.query;
        console.log("Query params:", queryParams);

        // Check if we have query params
        if (!queryParams.period || !queryParams.total) {
          console.log("No query params, redirecting to rental page");
          router.push("/user/sewa");
          return;
        }

        // Set rental details dari query params
        rentalDetails.value = {
          period: parseInt(queryParams.period) || 0,
          total: parseInt(queryParams.total) || 0,
        };

        // Validate the values
        if (rentalDetails.value.period <= 0 || rentalDetails.value.total <= 0) {
          console.error("Invalid rental details:", rentalDetails.value);
          throw new Error("Data sewa tidak valid");
        }

        console.log("Rental details:", rentalDetails.value);

        // Ambil status pembayaran terkini
        await fetchPaymentStatus();
      } catch (error) {
        console.error("Error initializing payment page:", error);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
        router.push("/user/sewa");
      } finally {
        isLoading.value = false;
      }
    });

    // Mengambil status pembayaran
    const fetchPaymentStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Gagal mengambil status pembayaran");

        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          paymentStatus.value = {
            ...data,
            status: data.bill ? "Lunas" : "Belum Lunas",
          };
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        paymentStatus.value = {
          status: "Belum Lunas",
          bill: null,
          created_at: null,
        };
      }
    };

    const submitPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        // Validate bank name for bank transfer
        if (paymentMethod.value === "BANK_TRANSFER" && !bankName.value) {
          throw new Error(
            "Nama bank harus diisi untuk pembayaran transfer bank"
          );
        }

        // Menyiapkan paymentData
        const paymentData = {
          total_bill: rentalDetails.value.total,
          payment_method: paymentMethod.value,
          rent_periods: rentalDetails.value.period,
          bank_name:
            paymentMethod.value === "BANK_TRANSFER" ? bankName.value : null,
        };

        console.log("Sending payment data:", paymentData); // Add this for debugging

        // Kirim data pembayaran ke server
        const response = await fetch("http://localhost:5000/user/sewa/bayar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Server error response:", errorData); // Add this for debugging
          throw new Error(errorData?.message || "Pembayaran gagal");
        }

        const result = await response.json();
        console.log("Payment success response:", result); // Add this for debugging

        // Update payment status immediately after successful payment
        paymentStatus.value = {
          status: "Lunas",
          bill: rentalDetails.value.total,
          created_at: new Date().toISOString(),
        };

        if (result.invoice) {
          const paymentId = result.invoice
            .replace(/^invoice-/, "")
            .replace(/\.pdf$/, "");
          invoiceUrl.value = `http://localhost:5000/api/downloads/${paymentId}`;
        }

        alert("Pembayaran berhasil!");
      } catch (error) {
        console.error("Error submitting payment:", error);
        alert(`Pembayaran gagal: ${error.message}`);
      }
    };

    const downloadInvoice = async () => {
      if (!invoiceUrl.value || isDownloading.value) return;

      isDownloading.value = true;
      downloadError.value = null;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(invoiceUrl.value, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to download invoice");
        }

        // Check content type
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/pdf")) {
          throw new Error("Invalid file format received");
        }

        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error("Empty file received");
        }

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${new Date().toISOString()}.pdf`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, 100);
      } catch (error) {
        console.error("Download error:", error);
        downloadError.value = error.message || "Failed to download invoice";
      } finally {
        isDownloading.value = false;
      }
    };

    const isValidAccess = computed(() => {
      return rentalDetails.value.period > 0 && rentalDetails.value.total > 0;
    });

    return {
      paymentMethod,
      rentalDetails,
      paymentStatus,
      invoiceUrl,
      showPaymentStatus,
      formattedPaymentDate,
      formattedBill,
      submitPayment,
      downloadInvoice,
      formatCurrency,
      bankName,
      isDownloading,
      downloadError,
      isValidAccess,
    };
  },
};
</script>

<style scoped>
/* Remove the old styles and add these new ones */
select option {
  @apply bg-gray-700 text-gray-100;
}

input::placeholder {
  @apply text-gray-400;
}

button:disabled {
  @apply cursor-not-allowed opacity-50;
}
</style>
