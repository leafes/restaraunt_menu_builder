<template>
  <input
    type="text"
    placeholder="Login"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
  />
  <br />
  <input
    @keydown.enter="signUp"
    type="password"
    placeholder="Password"
    class="border-b p-2 mb-4 focus:border-slate-800 outline-none"
  />
  {{ access_token }}
</template>
<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      access_token: ''
    }
  },
  methods: {
    async signUp() {
      const user = { email: `${this.login}@bibkin.com`, username: this.login, password: this.password };
      const f = await fetch('http://localhost:8000/api/v1/auth/sign-up', {
        method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: user,
        });
      const result = await f.json();
      this.access_token = result.access_token;
    }
  }
}
</script>
