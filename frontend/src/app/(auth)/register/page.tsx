"use client";

import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { LoadingIcon } from "@/components/Loading";
import axiosInstance from "@/service/axiosInstance";
import type { RegisterSuccess } from "@/types/User";

export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);

      await axiosInstance.post<RegisterSuccess>("/user", {
        username,
        password,
      });

      toast.success("User registered successfully");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.message)) {
          return error.response?.data.message.forEach((msg: string) =>
            toast.error(msg),
          );
        }

        return toast.error(error.response?.data.message);
      }

      return toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="username">
              Username
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? (
              <div className="px-4">
                <LoadingIcon size={8} />
              </div>
            ) : (
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Register
              </button>
            )}
          </div>
        </form>
        <div className="mt-4">
          <Link href="/login">Already have an account? Sign In</Link>
        </div>
      </div>
    </div>
  );
}
