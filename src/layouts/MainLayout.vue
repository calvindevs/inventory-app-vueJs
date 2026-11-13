<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar />

    <div class="flex-1 flex flex-col ml-64">
      <Navbar />

      <main class="flex-1 mt-16 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
