<template>
  <div class="bg-yellow-100 p-2 flex justify-between">
    <RouterLink to="/"> MENU CONSTRUCTOR v 0.1.0 </RouterLink>
    <nav>
      <router-link to="/create">Create</router-link> |
      <router-link to="/menu">View menu</router-link> |
      <router-link to="/edit">Edit menu</router-link>
    </nav>
  </div>
  <div class="m-3">
    <RouterView />
  </div>
</template>
