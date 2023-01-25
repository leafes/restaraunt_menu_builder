<template>
  <div class="m-3 text-lg">
    <p>Menu editor</p>
  </div>

  <div class="m-3">
    <div>
      <input
        type="text"
        class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
        placeholder="Submenu name"
        v-model="newSubmenuName"
        @keydown.enter="addSubMenu()"
      />
      <input
        type="text"
        class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
        placeholder="Menu name"
        v-model="menuName"
        >
    </div>
    <div
      class="shadow-md p-2 mb-2"
      v-for="submenu in subMenus"
      :key="submenu.name"
    >
      {{ submenu.name }}
      <div
        class="p-2 flex mb-2 bg-slate-50"
        v-for="meal in submenu.meals"
        :key="meal.name"
      >
        {{ meal.name }} | ${{ meal.price }}
      </div>
      <div class="p-2 flex opacity-50 hover:opacity-100 group-focus:opacity-100">
        <input
          type="text"
          placeholder="Meal name"
          class="border-b focus:border-slate-800 outline-none"
          v-model="newMealNames[submenu.name]"
        />
        <input
          type="number"
          placeholder="Price"
          class="ml-2 border-b focus:border-slate-800 outline-none w-16"
          v-model="newMealPrices[submenu.name]"
        />
        <button @click="addMeal(submenu.name)">
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
  </div>
  Meals to add:
  {{ newMealNames }}
  {{ newMealPrices }}
  {{ testData }}
</template>
<script>
export default {
  data() {
    return {
      menuName: "",
      menuId: 0,
      newSubmenuName: "",
      testData: {},
      newMealNames: {},
      newMealPrices: {},
      subMenus: [],
    };
  },
  methods: {
    addMeal(submenuName) {
      if (!this.newMealNames[submenuName] || !this.newMealPrices[submenuName]) return;
      const submenuToChange = this.subMenus.find((submenu) => submenu.name === submenuName);
      submenuToChange.meals.push({ name: this.newMealNames[submenuName], price: Number(this.newMealPrices[submenuName]) });
      this.newMealNames[submenuName] = '';
      this.newMealPrices[submenuName] = '';
    },
    addSubMenu() {
      const newSubMenu = { name: this.newSubmenuName, id: this.subMenus.length, meals:[]}
      this.subMenus.push(newSubMenu);
      this.newSubmenuName = '';
    },
    async saveNewMenu() {
      const postToDB = async (obj, path) => {
        const newBody = JSON.stringify(obj);
        const response = await fetch(`http://localhost:8000/api/v1/${path}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: newBody,
        });

        return await response.json();
      };

      const createMenuData = await postToDB(
        { title: this.menuName, description: 'bibaboba' },
        'menus/'
      );
      const pathForThisMenu = `menus/${createMenuData.id}/submenus/`;

      this.subMenus.forEach(async (submenu) => {
        const submenuData = await postToDB({ title: submenu.name, description: 'add meals iter 2' },
          pathForThisMenu
        );
        const pathForThisSubMenu = `${pathForThisMenu}${submenuData.id}/dishes/`;

        submenu.meals.forEach(async (meal) => await postToDB({ title: meal.name, price: meal.price, description: 'bum' },
            pathForThisSubMenu)
          );

      });

    }
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
