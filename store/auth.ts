import { defineStore } from 'pinia';
import jwt_decode from "jwt-decode";
import { Usuario } from '../models/Usuario';

interface AuthState {
  token: string | null;
}

export const authStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,

  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUsuario: (state) => {
      if (state.token) {
        const objeto: any = jwt_decode(state.token);
        return objeto['0'];
      }
      return null;
    },
  },

  actions: {
    setToken(token: string | null) {
      this.token = token;
    },

    clearToken() {
      this.token = null;
    },

   
  }
})