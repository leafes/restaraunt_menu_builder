<template>
  <div class="m-auto mt-32 text-center w-60">
    <h1 class="text-xl mb-4">Sign in</h1>
  <input
    type="text"
    v-model="login"
    placeholder="Login"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none w-full"
  />
  <br />
  <input
    @keydown.enter="registration"
    v-model="password"
    type="password"
    placeholder="Password"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none w-full"
  />
  <br>
  <button class="bg-black mt-4 text-white p-2.5 w-full rounded-lg">Sign in</button>
  {{ test }}
</div>
</template>
<script>
import { signIn, signUp } from "../services/api-fetch";
export default {
  data() {
    return {
      login: "",
      password: "",
      access_token: "",
      test: '',
    };
  },
  methods: {
    async registration() {
      const user = {
        email: `${this.login}@gmail.com`,
        username: this.login,
        password: this.password,
      };
      const response = await signUp(user);
      localStorage.access_token = response.access_token;
      localStorage.username = user.username;
    },
  },
};
</script>
