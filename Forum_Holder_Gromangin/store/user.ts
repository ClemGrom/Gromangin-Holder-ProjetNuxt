import { defineStore } from "pinia";
import bcrypt from "bcryptjs";
import { NuxtLink } from "#build/components";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userEmail: '', 
  }),
  actions: {
    async registerUser(
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
      isAdmin: boolean
    ) {
      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        isAdmin ||
        password !== confirmPassword
      ) {
        return;
      }
      bcrypt.genSalt(10, function (err: any, salt: any) {
        bcrypt.hash(password, salt, async function (err: any, hash: any) {
          await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: hash,
              isAdmin: false,
            }),
          }).then(() => {
            return new Promise((resolve, reject) => {
              navigateTo("/").then(resolve).catch(reject);
            });
          });
        });
      });
      console.log("User registered");
    },
    async loginUser(email: string, password: string) {
      if (!email || !password) {
        return;
      }
      const result = await fetch(
        `http://localhost:3000/api/users?email=${email}`
      ).then((res) => res.json());
      if (result.length === 0) {
        return;
      }
      console.log(result)
      bcrypt.compare(
        password,
        result.users[0].password,
        (err: any, res: any) => {
          if (res) {
            this.userEmail = result.users[0].email; 
            return new Promise((resolve, reject) => {
              console.log("User logged in");
              navigateTo("/").then(resolve).catch(reject);
            });
          } else {
            console.log("Incorrect password");
          }
        }
      );
    },
    logout() {
      this.userEmail = '';
    },
    async getAdmin() {
      if (!this.userEmail) {
        return;
      }
      const result = await fetch(
        `http://localhost:3000/api/users?email=${this.userEmail}`
      ).then((res) => res.json());
      if (result.length === 0) {
        return;
      }
      console.log(result)
      return result.users[0].isAdmin;
    },
    async getUserId() {
      if (!this.userEmail) {
        return;
      }
      const result = await fetch(
        `http://localhost:3000/api/users?email=${this.userEmail}`
      ).then((res) => res.json());
      if (result.length === 0) {
        return;
      }
      console.log(result)
      return result.users[0].id;
    }
  },
});
