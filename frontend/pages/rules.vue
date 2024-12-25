<template>
  <div class="min-h-screen bg-[#FEF9F2] py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <header
        class="bg-[#dfaea1] text-white py-6 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 class="text-4xl font-extrabold">Aturan Kost</h1>
        <p class="mt-2 text-[#fffcf5]">
          Harap diperhatikan dan dipatuhi untuk kenyamanan bersama.
        </p>
      </header>

      <div class="p-6 sm:p-8 lg:p-10 space-y-8">
        <section>
          <h2 class="text-2xl font-semibold text-[#895159] flex items-center">
            <AlertTriangle class="mr-2 h-6 w-6" />
            Peringatan
          </h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div
              v-for="(item, index) in warnings"
              :key="index"
              class="bg-[#eef4ce] bg-opacity-30 p-4 rounded-lg flex items-start"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 text-[#374375] mr-3 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="font-bold text-[#374375]">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-[#4d5c60]">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#895159] flex items-center">
            <Book class="mr-2 h-6 w-6" />
            Peraturan
          </h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="(item, index) in rules"
              :key="index"
              class="bg-[#fcf3e3] border-[#374375] p-6 rounded-lg shadow-sm flex items-start"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 text-[#374375] mr-3 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="font-bold text-[#374375]">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer
        class="bg-[#eef4ce] text-center py-4 text-sm text-[#374375] font-light"
      >
        Terima kasih atas kerja sama Anda dalam mematuhi aturan kost ini.
      </footer>
    </div>
  </div>
</template>

<script setup>
import {
  AlertTriangle,
  Book,
  Clock,
  CreditCard,
  Home,
  Music,
  PawPrint,
  Power,
  Trash2,
  Users,
} from "lucide-vue-next";

const warnings = [
  {
    icon: Trash2,
    title: "Kebersihan",
    content:
      "Wajin menjaga kebersihan kamar dan fasilitas bersama. Buang sampah pada tempatnya.",
  },
  {
    icon: Music,
    title: "Keributan",
    content:
      "Dilarang membuat keributan yang dapat meganggu penghuni kos yang lain.",
  },
  {
    icon: Home,
    title: "Keamanan",
    content: "Diharapkan untuk mengunci pintu kamar masing-masing. Pintu pagar menggunakan sidik jari penghuni kos.",
  },
  {
    icon: Users,
    title: "Tamu",
    content:
      "Tamu diperbolehkan menginap tanpa dipungut biaya. ",
  },
];

const rules = [
  {
    icon: Clock,
    title: "Jam Malam",
    content: "Pintu pagar akan dikunci setelah jam 23:00.",
  },
  {
    icon: CreditCard,
    title: "Pembayaran",
    content: "Pembayaran kos dilakukan pada tanggal 1-10 setiap bulannya.",
  },
  {
    icon: AlertTriangle,
    title: "Larangan",
    content:
      "Merokok dan mengonsumsi alkohol di dalam area kost dilarang keras.",
  },
  {
    icon: PawPrint,
    title: "Hewan Peliharaan",
    content: "Hewan peliharaan tidak diperbolehkan masuk kecuali dengan izin khusus.",
  },
  {
    icon: Home,
    title: "Fasilitas",
    content: "Penghuni dilarang menambah atau merusak fasilitas kos yang sudah ada.",
  },
  {
    icon: Power,
    title: "Listrik & Air",
    content: "Penghuni kos akan membeli token listrik secara mandiri. Biaya air ditanggung oleh kos.",
  },
  {
    icon: Users,
    title: "Acara",
    content: "Tidak diperbolehkan melakukan sebuah acara di dalam area kos kecuali sudah memiliki izin.",
  },
];
</script>
