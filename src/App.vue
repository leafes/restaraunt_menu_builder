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
    </div>
    <div
      class="shadow-md p-2 mb-2"
      v-for="submenu in subMenus"
      :key="submenu.id"
    >
      {{ submenu.name }}
      <div
        class="p-2 flex mb-2 bg-slate-50"
        v-for="meal in meals[submenu.id]"
        :key="meal.name"
      >
        {{ meal.name }} | ${{ meal.price }}
      </div>
      <div class="p-2 flex">
        <input
          type="text"
          placeholder="Meal name"
          class="border-b focus:border-slate-800 outline-none"
          v-model="mealNames[submenu.id]"
        />
        <input
          type="number"
          placeholder="Price"
          class="ml-2 border-b focus:border-slate-800 outline-none w-16"
          v-model="mealPrices[submenu.id]"
        />
        <button @click="addMeal(submenu.id)">
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
      >
        Save menu
      </button>
    </div>
  </div>
  All submenus for this menu in db:
  {{ testData }}
</template>
<script>
export default {
  data() {
    return {
      newSubmenuName: "",
      testData: {},
      // добавить инпуты в стейт через вотч?
      mealNames: [],
      mealPrices: [],
      subMenus: [
        { name: "Sandwiches", id: 0 },
        { name: "Salads", id: 1 },
      ],
      meals: [
        [
          { name: "Potato sandwich", price: 100 },
          { name: "Jam sandwich", price: 100 },
        ],
        [{ name: "Cherry salad", price: 100 }],
      ],
    };
  },
  methods: {
    addMeal(submenuId) {
      if (this.mealNames[submenuId].length < 1 || this.mealPrices[submenuId].length < 1) return;
      const newMeal = { name: this.mealNames[submenuId], price: this.mealPrices[submenuId] };
      this.meals[submenuId].push(newMeal);
      this.mealNames[submenuId] = "";
      this.mealPrices[submenuId] = "";
    },
    addSubMenu() {
      const newSubMenu = { name: this.newSubmenuName, id: this.subMenus.length }
      this.subMenus.push(newSubMenu);
    }
  },
  created() {
    const getMenu = async () => {
      const f = await fetch("http://localhost:8000/api/v1/menus/1/submenus/");
      const result = await f.json();
      this.testData = result;
      return result;
    };

    getMenu();
  },
};
</script>
