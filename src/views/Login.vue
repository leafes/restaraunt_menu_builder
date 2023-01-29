<template>
  <input
    type="text"
    v-model="login"
    placeholder="Login"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
  />
  <br />
  <input
    @keydown.enter="registration"
    v-model="password"
    type="password"
    placeholder="Password"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
  />
  {{ test }}
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
    },
  },
};
</script>
