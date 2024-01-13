import { create } from "zustand";
import { getAllAccounts } from "../lib/actions/account.actions";

export const useAccountStore = create((set) => ({
  data: [],
  isLoading: false,
  error: null,
  getAccounts: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllAccounts({
        query: "",
        page: 1,
        limit: 6,
      });
      set({ data: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
