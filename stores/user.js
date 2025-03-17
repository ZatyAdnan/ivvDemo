import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: null,
    name: null,
    roles: null,
    isAuth: false,
  }),
  persist: true,
  actions: {
    setUsername(username) {
      this.username = username;
    },
    setName(name) {
      this.name = name;
    },
    setRoles(roles) {
      this.roles = roles;
    },
    setIsAuthenticated(isAuth) {
      this.isAuth = isAuth;
    },
  },
});
