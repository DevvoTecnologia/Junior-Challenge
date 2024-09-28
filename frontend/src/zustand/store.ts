import { create } from "zustand";
import { persist } from "zustand/middleware";

const key = "ringstorage";

export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: {
        token: "aaa",
      },
      setUserInfo: () => {
        set((state: never) => state);
      },
    }),
    { name: key },
  ),
);
