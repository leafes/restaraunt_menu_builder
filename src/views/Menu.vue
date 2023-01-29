<template>
  Here we can view the menu in the future <br />
  <div class="block bg-red-300 p-2 rounded-md" v-if="menu.detail">
    {{ menu.detail }}
  </div>
  <input
    placeholder="Menu id"
    v-model="menuId"
    type="number"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
    @keydown.enter="loadMenu"
  />
  <div v-if="isMenuLoaded">
    <h2 class="text-2xl font-bold">{{ menu.title }}</h2>
    <p class="text-md text-gray-400">{{ menu.description }}</p>
    <div v-for="submenu in menu.submenus" class="mt-2">
      <h2 class="text-lg">{{ submenu.title }}</h2>
      <p class="text-sm text-gray-400">{{ submenu.description }}</p>
      <div v-for="dish of submenu.dishes" class="border-b p-1">
        <div class="mt-2 font-thin">
          {{ dish.title }}
          <span class="text-xs text-gray-400">{{ submenu.description }}</span>
        </div>
        ${{ dish.price }}
      </div>
    </div>
  </div>
  <!-- <div class="text-gray-300">
    {{ menu }}
    Token: {{ token }}
  </div> -->
</template>
<script>
import { getMenu } from "../services/api-fetch";
export default {
  data() {
    return {
      menuId: this.$route.query.id || 0,
      menu: {},
      token: "",
    };
  },
  created() {
    if (this.menuId > 0) this.loadMenu();
    this.token = localStorage.getItem("access_token");
  },
  methods: {
    async loadMenu() {
      this.menu = await getMenu(this.menuId);
    },
  },
  computed: {
    isMenuLoaded() {
      return Object.keys(this.menu).length > 0;
    },
  },
  watch: {
    menuId() {
      this.$router.push({
        path: this.$route.fullPath,
        query: { id: this.menuId },
      });
    },
  },
};
</script>
