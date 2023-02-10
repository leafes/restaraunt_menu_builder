<template>
  <div class="text-lg">
    <p>Menu editor</p>
  </div>

  <div class="mt-4">
    <input
      type="text"
      class="bg-gray-100 outline-none p-2 rounded-lg"
      placeholder="Menu name"
      v-model="menu.title"
    />
  </div>
  <input
    type="text"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none mt-2"
    placeholder="Submenu name"
    v-model="newSubmenuTitle"
    @keydown.enter="addSubMenu()"
  />
  <div
    class="shadow-md p-2 mb-2"
    v-for="submenu in menu.submenus"
    :key="submenu.title"
  >
    {{ submenu.title }}
    <div
      class="p-2 flex mb-2 bg-slate-50"
      v-for="dish in submenu.dishes"
      :key="dish.title"
    >
      {{ dish.title }} | ${{ dish.price }}
    </div>
    <div class="p-2 mt-2 flex opacity-50 focus:opacity-100 group-focus:opacity-100">
      <input
        type="text"
        placeholder="Meal name"
        class="border-b focus:border-slate-800 outline-none"
        v-model="newMeals[submenu.title].title"
      />
      <input
        type="number"
        placeholder="Price"
        class="ml-2 border-b focus:border-slate-800 outline-none w-16"
        v-model="newMeals[submenu.title].price"
      />
      <button @click="addMeal(submenu.title)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="m-3 text-right">
    <button
      class="p-2 pl-4 pr-4 rounded-full border-green-200 border-2 active:bg-slate-100"
      @click="saveNewMenu"
    >
      Save menu
    </button>
  </div>
  {{ menuId }}
</template>
<script>
import { createMenu } from '../services/api-fetch';
export default {
  data() {
    return {
      menu: { title: "", description: "", submenus: [] },
      newSubmenuTitle: "",
      testData: {},
      newMeals: {},
      subMenus: [],
      menuId: 0,
    };
  },
  methods: {
    addMeal(submenuTitle) {
      const submenuToUpdate = this.menu.submenus.find(
        (submenu) => submenu.title === submenuTitle
      );
      const newMeal = this.newMeals[submenuTitle];
      this.newMeals[submenuTitle] = {};
      submenuToUpdate.dishes.push(newMeal); 
    },
    addSubMenu() {
      const newSubMenu = {
        title: this.newSubmenuTitle,
        dishes: [],
      };
      this.menu.submenus.push(newSubMenu);
      this.newMeals[this.newSubmenuTitle] = { title: '', description: '', price: '' };
      this.newSubmenuTitle = "";
    },
    async saveNewMenu() {
      const accessToken = localStorage.getItem('access_token');
      console.log(accessToken);
      this.menuId = await createMenu(this.menu, accessToken);
      setTimeout(() => this.$router.push({ name: 'ViewMenu', query: { id: this.menuId }}), 2000);
    },
  },
  // created() {
  //   const getMenu = async () => {
  //     const f = await fetch("http://localhost:8000/api/v1/menus");
  //     const result = await f.json();
  //     this.testData = result;
  //     return result;
  //   };
  //
  //   getMenu();
  // },
};
</script>
