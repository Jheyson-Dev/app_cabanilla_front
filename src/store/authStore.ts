import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  id: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

interface Decode {
  role: string;
  id: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      role: null,
      id: null,
      setToken: (token: string) => {
        const decode: Decode = jwtDecode(token);
        console.log(decode);
        set({ token, isAuthenticated: true, role: decode.role, id: decode.id });
      },
      clearToken: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
