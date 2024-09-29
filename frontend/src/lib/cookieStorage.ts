"use client";

import type { CookieValueTypes } from "cookies-next";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import type { OptionsType } from "cookies-next/lib/types";
import type { StateStorage } from "zustand/middleware";

const cookieStorage: StateStorage = {
  setItem: (key: string, value: CookieValueTypes, options?: OptionsType) => {
    setCookie(key, value, { httpOnly: true, ...options });
  },

  getItem: (key: string, options?: OptionsType) => {
    const value = getCookie(key, options);
    return typeof value === "string" ? value : null;
  },

  removeItem: (key: string, options?: OptionsType) => {
    deleteCookie(key, options);
  },
};

export default cookieStorage;
