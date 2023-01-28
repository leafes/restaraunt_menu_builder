<template>
  <input
    type="text"
    v-model="login"
    placeholder="Login"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
  />
  <br />
  <input
    @keydown.enter="signUp"
    v-model="password"
    type="password"
    placeholder="Password"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
  />
  {{ test }}
</template>
<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      access_token: '',
      test: {}
    }
  },
  methods: {
    async signUp() {
      const user = { email: `${this.login}@gmail.com`, username: this.login, password: this.password };
      this.test = user;
        const newBody = JSON.stringify(user);
        const response = await fetch(`http://localhost:8000/api/v1/auth/sign-up`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: newBody,
        })
        this.test = await response.json();
      }
  }
}
</script>
