<template>
  <aside class="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 p-4">
    <h2 class="text-xl font-bold mb-6">Inventory App</h2>
    <nav class="space-y-2">
      <router-link to="/dashboard" class="block p-2 rounded hover:bg-slate-800"
        >Dashboard</router-link
      >
      <router-link to="/products" class="block p-2 rounded hover:bg-slate-800"
        >Products</router-link
      >
      <router-link to="/categories" class="block p-2 rounded hover:bg-slate-800"
        >Categories</router-link
      >
    </nav>
  </aside>
</template>
