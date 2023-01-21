<template>
  <div class="m-3 text-lg">
    <p>Menu editor</p>
  </div>

  <div class="m-3">
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
        <input type="text" placeholder="Meal name" class="border-b" v-model="mealInputs[submenu.id]"/>
        <button
          @click="addMeal(submenu.id)"
          >
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
  </div>
  <div class="m-3"></div>
</template>
<script>
export default {
  data() {
    return {
      // добавить инпуты в стейт через вотч?
      mealInputs: [],
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
      const newMeal = { name: this.mealInputs[submenuId], price: 100}
      this.meals[submenuId].push(newMeal);
      this.mealInputs[submenuId] = '';
    }
  }
};
</script>
