<template>
  <div class="mt-32 w-96 m-auto text-center">
    <div class="mt-4">
    <h1 class="text-2xl">This is a start page</h1> <br />
    <p>Menu coonstructor is a tool that helps you create a menu for your restaurant with shareable QR-code or link</p> <br />
    <router-link to="/create"><div class="bg-black mt-2 mb-4 text-white p-2.5 w-full rounded-lg active:scale-95">Create</div></router-link>
    <router-link to="/menu">View menu</router-link> |
    <router-link to="/edit">Edit menu</router-link>
  </div>
  </div>
</template>
