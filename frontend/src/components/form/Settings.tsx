"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import type { TransitionStartFunction } from "react";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import catchErrorClient from "@/global/catchErrorClient";
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
}: Readonly<SettingsFormProps>) {
  const [username, setUsername] = useState(usernameSession);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password.trim()) {
      return toast.error("Password is required.");
    }

    if (newPassword.length > 255) {
      return toast.error("New password should be at most 255 characters long");
    }

    if (newPassword === password) {
      return toast.error(
        "New password must be different from the current password.",
      );
    }

    if (password.length > 255) {
      return toast.error("Password should be at most 255 characters long");
    }

    if (username.length > 20) {
      return toast.error("Username should be at most 20 characters long");
    }

    try {
      await fetchClient.put<UpdateUserSuccess>(
        `/user/${userId}`,
        {
          username: username || undefined,
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
    <>
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
        <p className="mb-2">
          <span className="text-sm text-red-500">
            Be careful when updating your information. You will be logged out
            and you will not able to recover your account!
          </span>
        </p>
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username:
          </label>
          <input
            className="w-full rounded border border-gray-300 p-2"
            type="text"
            id="username"
            name="username"
            placeholder={usernameSession}
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
        <p>
          <span className="text-sm text-gray-500">
            Leave blank to keep the same.
          </span>
        </p>
        <div className="relative mb-6">
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium"
          >
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
          <div className="flex justify-center">
            <LoadingIcon />
          </div>
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

      <BtnDeleteUser
        userId={userId}
        token={token}
        isPending={isPending}
        startTransition={startTransition}
      />
    </>
  );
}

interface BtnDeleteUserProps {
  userId: number | undefined;
  token: string | undefined;
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

export function BtnDeleteUser({
  token,
  userId,
  isPending,
  startTransition,
}: Readonly<BtnDeleteUserProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  async function deleteUser() {
    if (!password.trim()) {
      return toast.error("Password is required.");
    }

    if (password.length > 255) {
      return toast.error("Password should be at most 255 characters long");
    }

    startTransition(async () => {
      try {
        await fetchClient.delete(`/user/${userId}`, {
          headers: {
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
          data: {
            password,
          },
        });

        toast.success("User deleted successfully.");

        return await signOut({
          redirectTo: "/",
        });
      } catch (error) {
        return catchErrorClient(
          error,
          "An error occurred while deleting the user.",
        );
      }
    });
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
        {!isPending && (
          <motion.button
            onClick={() => setIsModalOpen(true)}
            disabled={isPending}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
          >
            Delete User
          </motion.button>
        )}
      </motion.div>

      <Modal isModalOpen={isModalOpen}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="mx-3 rounded bg-gray-800 p-6 text-white shadow-lg sm:mx-2"
        >
          <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete your account?</p>
          <div className="mb-4">
            <p className="mb-4 text-red-500">
              This action is irreversible. You will lose all your data and you
              will be logged out!
            </p>

            <p className="mb-4">
              If you want to proceed, please type your current password to
              confirm.
            </p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded border border-gray-300 p-2 pl-12 text-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <motion.button
                type="button"
                className="absolute left-3 top-[0.60rem] border-r pr-2 text-gray-600"
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
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="mr-4 rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
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
