<template>
  Here we can view the menu in the future <br />
  <input
    placeholder="Menu id"
    v-model="menuId"
    type="number"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
    @keydown.enter="loadMenu"
  />
  <div v-if="isMenuLoaded">
    <h2 class="text-2xl font-bold">{{ menuInfo.title }}</h2>
    <p class="text-md text-gray-400">{{ menuInfo.description }}</p>
    <div v-for="submenu in menuInfo.submenus" class="mt-2">
      <h2 class="text-lg">{{ submenu.title }}</h2>
      <p class="text-sm text-gray-400">{{ submenu.description }}</p>
      <div v-for="dish of submenu.dishes" class="border-b p-1">
        <div class="mt-2 font-thin">{{ dish.title }}
        <span class="text-xs text-gray-400">{{ submenu.description }}</span></div>
        ${{ dish.price }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuId: 0,
      menuInfo: {},
    };
  },
  methods: {
    async loadMenu() {
      const getFromDB = async (path) => {
        const f = await fetch(`http://localhost:8000/api/v1/${path}`);
        return await f.json();
      };
      const menu = await getFromDB(`menus/${this.menuId}`);
      const submenus = await getFromDB(`menus/${this.menuId}/submenus`);
      const submenusWithDishes = await Promise.all(
        submenus.map(async (submenu) => {
          const dishes = await getFromDB(
            `menus/${this.menuId}/submenus/${submenu.id}/dishes`
          );
          return { ...submenu, dishes: dishes };
        })
      );
      const menuInfo = {
        title: menu.title,
        description: menu.description,
        submenus: submenusWithDishes,
      };
      this.menuInfo = menuInfo;
    },
  },
  computed: {
    isMenuLoaded() {
      return Object.keys(this.menuInfo).length > 0;
    },
  },
};
</script>
