import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({}),
  actions: {
    async registerUser(
      email: string,
      password: string,
      confirmPassword: string
    ) {
      const bcrypt = require("bcryptjs");
      if (
        !email ||
        !password ||
        !confirmPassword ||
        password !== confirmPassword
      ) {
        return;
      }
      bcrypt.genSalt(10, function (err: any, salt: any) {
        bcrypt.hash(password, salt, async function (err: any, hash: any) {
          await fetch("http://localhost:3000/api/users", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: hash,
            }),
          });
        });
      });
      console.log("User registered");
    },
  },
});
