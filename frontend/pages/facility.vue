<template>
  <div class="min-h-screen bg-[#FEF9F2]">
    <!-- Header -->
    <header class="bg-[#FEF9F2] text-[#895159] py-6 text-center">
      <h1 class="text-4xl font-extrabold">Fasilitas Kost</h1>
      <p class="text-lg text-[#4d5c60] mt-2 font-medium">
        Rasakan kenyamanan kos bintang lima dengan harga terjangkau hanya ada di kos P08
      </p>
    </header>

    <!-- Carousel -->
    <div class="flex justify-center mt-6">
      <swiper-container
        class="w-3/4 max-w-md h-60 rounded-lg shadow-lg overflow-hidden"
        pagination="true"
        navigation="true"
        autoplay-delay="3000"
        loop="true"
      >
        <swiper-slide>
          <img
            src="https://asset.kompas.com/crops/Hx1C9uNVEfESI4G-wn5S8AywBQQ=/0x0:1000x667/1200x800/data/photo/2023/08/02/64ca6f0fd0d96.jpg"
            alt="Kamar Nyaman"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://asset.kompas.com/crops/yMUAxq9AsqB97BiRw1dHkKbTXfo=/0x0:1000x667/750x500/data/photo/2019/10/25/5db25f8d51968.jpg"
            alt="Kamar Mandi Pribadi"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://hydeliving.s3.ap-southeast-3.amazonaws.com/uploads/1669713673719.webp"
            alt="Dapur Bersama"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://coworker.imgix.net/photos/indonesia/jakarta/kekini-ruang-bersama/2.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
            alt="Ruang Bersama"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://www.siliconrepublic.com/wp-content/uploads/2014/12/img/3ow92h.jpg"
            alt="Keamanan 24 Jam"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
      </swiper-container>
    </div>

    <!-- Facility List -->
    <div class="px-6 mt-10">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-justify"
      >
        <div class="bg-[#eef4ce] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#895159]">
            Kamar nyaman dengan desain yang modern
          </h3>
          <p class="mt-2 text-[#4d5c60]">
            Kamar tidur yang luas dengan perabotan mewah dan juga dilengkapi meja belajar yang luas. 
            Setiap kamar juga dilengkapi dengan AC dan juga kamar mandi pribadi.
          </p>
        </div>
        <div class="bg-[#eef4ce] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#895159]">Kamar Mandi Pribadi</h3>
          <p class="mt-2 text-[#4d5c60]">
            Setiap kamar dilengkapi dengan shower beserta water heater, toilet juga wastafel pribadi.
          </p>
        </div>
        <div class="bg-[#eef4ce] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#895159]">
            Dapur bersama yang lengkap dan minibar
          </h3>
          <p class="mt-2 text-[#4d5c60]">
            Dapur bersama yang dilengkapi dengan peralatan masak lengkap dan juga kulkas dua pintu, disertai minibar
            untuk duduk bersama.
          </p>
        </div>
        <div class="bg-[#eef4ce] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#895159]">Layanan Laundry 24 jam</h3>
          <p class="mt-2 text-[#4d5c60]">
            Fasilitas laundry dengan mesin cuci dilengkapi dengan pengering dan ruang jemur yang luas.
          </p>
        </div>
        <div class="bg-[#eef4ce] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#895159]">
            Jaringan internet 3000 Mbps
          </h3>
          <p class="mt-2 text-[#4d5c60]">
            Nikmati akses Wi-Fi super cepat di seluruh area kost, ideal untuk bekerja,
            belajar, atau streaming film favoritmu.
          </p>
        </div>
        <div class="bg-[#eef4ce] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#895159]">Keamanan 24 Jam</h3>
          <p class="mt-2 text-[#4d5c60]">
            Sistem keamanan 24 jam dengan CCTV dan penjaga kost, memastikan kamu
            merasa aman dan nyaman setiap saat.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "swiper/element/bundle";

export default {
  name: "Facility",
  mounted() {
    register();
  },
};
</script>

<style>
@import "swiper/swiper-bundle.css";
</style>
