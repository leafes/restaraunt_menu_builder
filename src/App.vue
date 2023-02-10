<template>
  <div class="bg-yellow-100 p-2 flex justify-between">
    <RouterLink to="/"> MENU CONSTRUCTOR v 0.1.0 </RouterLink>
    <nav>
      <router-link to="/login" v-if="username === null">Login</router-link>
      <a href="#" v-else> {{ username }}</a>
      |
      <router-link to="/create">Create</router-link> |
      <router-link to="/menu">View</router-link> |
      <router-link to="/edit">Edit</router-link>
    </nav>
  </div>
  <div class="m-3">
    <RouterView />
  </div>
  <footer
    class="p-4 opacity-40 text-sm hover:opacity-100 flex justify-center space-x-1 mt-64"
  >
    <img
      src="https://github.com/favicon.ico"
      height="20"
      width="20"
      class="mr-2"
    />
    Code:
    <div>
      <a
        href="https://github.com/leafes/restaurant_menu_builder"
        class="underline text-blue-400 hover:opacity-100"
        >frontend</a
      >
      /
      <a
        href="https://github.com/B1nC0D3/api_restaurant"
        class="underline text-blue-400"
        >backend</a
      >
      2023
    </div>
  </footer>
</template>
<script>
export default {
  mounted() {
    this.username = localStorage.username || null;
  },
  data() {
    return {
      username: null,
    };
  },
};
</script>
