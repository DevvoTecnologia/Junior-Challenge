"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import catchErrorClient from "@/lib/catchErrorClient";
import fetchClient from "@/lib/fetchClient";
import type { UpdateUserSuccess } from "@/types/User";

import { LoadingIcon } from "../Loading";
import Modal from "../Modal";

interface SettingsFormProps {
  usernameSession: string | undefined;
  userId: number | undefined;
  token: string | undefined;
}

export default function SettingsForm({
  usernameSession = "",
  userId = 0,
  token = "",
}: SettingsFormProps) {
  const [username, setUsername] = useState(usernameSession);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim()) {
      return toast.error("Username is required.");
    }

    if (!password.trim()) {
      return toast.error("Password is required.");
    }

    if (newPassword === password) {
      return toast.error(
        "New password must be different from the current password.",
      );
    }

    try {
      await fetchClient.put<UpdateUserSuccess>(
        `/user/${userId}`,
        {
          username,
          password,
          newPassword,
        },
        {
          headers: {
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
        },
      );

      toast.success("User updated successfully.");

      await signOut({
        redirectTo: "/login",
      });
    } catch (error) {
      return catchErrorClient(
        error,
        "An error occurred while updating the user.",
      );
    }
  }

  return (
    <motion.form
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-md rounded-lg bg-white p-6 text-black shadow-lg"
      onSubmit={(e) => {
        startTransition(async () => {
          await submitForm(e);
        });
      }}
    >
      <div className="mb-4">
        <label htmlFor="username" className="mb-2 block text-sm font-medium">
          Username:
        </label>
        <input
          className="w-full rounded border border-gray-300 p-2"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="relative mb-6">
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password:
        </label>
        <input
          className="w-full rounded border border-gray-300 p-2"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <motion.button
          type="button"
          className="absolute right-2 top-9 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showPassword ? (
            <FaEye color="black" size={24} />
          ) : (
            <FaEyeSlash color="black" size={24} />
          )}
        </motion.button>
      </div>
      <div className="relative mb-6">
        <label htmlFor="newPassword" className="mb-2 block text-sm font-medium">
          New Password:
        </label>
        <input
          className="w-full rounded border border-gray-300 p-2"
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          id="newPassword"
          placeholder="********"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <motion.button
          type="button"
          className="absolute right-2 top-9 text-gray-600"
          onClick={() => setShowNewPassword(!showNewPassword)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showNewPassword ? (
            <FaEye color="black" size={24} />
          ) : (
            <FaEyeSlash color="black" size={24} />
          )}
        </motion.button>
      </div>
      {isPending ? (
        <LoadingIcon />
      ) : (
        <button
          disabled={isPending}
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Save
        </button>
      )}
    </motion.form>
  );
}

interface BtnDeleteUserProps {
  userId: number | undefined;
  token: string | undefined;
}

export function BtnDeleteUser({ token, userId }: BtnDeleteUserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function deleteUser() {
    try {
      await fetchClient.delete(`/user/${userId}`, {
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      });

      toast.success("User deleted successfully.");

      await signOut({
        redirectTo: "/",
      });
    } catch (error) {
      return catchErrorClient(
        error,
        "An error occurred while deleting the user.",
      );
    }
  }

  function handleConfirmDelete() {
    setIsModalOpen(false);
    deleteUser();
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6"
      >
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
        >
          Delete User
        </motion.button>
      </motion.div>

      <Modal isModalOpen={isModalOpen}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="rounded bg-gray-800 p-6 text-white shadow-lg"
        >
          <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete your account?</p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="mr-4 rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}
