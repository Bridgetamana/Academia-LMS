import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  displayName: null,
  setUser: (user, role, displayName) => set({ user, role, displayName }),
  clearUser: () => set({ user: null, role: null }),
  // clearUser: () => set({ user: null, role: null, displayName: null }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
