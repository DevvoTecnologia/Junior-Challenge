"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import type { TransitionStartFunction } from "react";
import { useState, useTransition } from "react";
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

export default function SettingsOAuthForm({
  usernameSession = "",
  userId = 0,
  token = "",
}: Readonly<SettingsFormProps>) {
  const [username, setUsername] = useState(usernameSession);
  const [isPending, startTransition] = useTransition();

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username.length > 20) {
      return toast.error("Username should be at most 20 characters long");
    }

    if (username && !username.trim()) {
      return toast.error("Username should not be empty");
    }

    try {
      await fetchClient.put<UpdateUserSuccess>(
        `/user/github/${userId}`,
        {
          username: username || undefined,
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

  const [confirm, setConfirm] = useState(false);

  async function deleteUser() {
    if (!confirm) {
      return toast.error("You must confirm the deletion");
    }

    startTransition(async () => {
      try {
        await fetchClient.delete(`/user/github/${userId}`, {
          headers: {
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
          data: {
            confirm,
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

            <div className="relative flex items-center gap-2">
              <label htmlFor="confirm" className="block text-sm font-medium">
                Confirm:
              </label>
              <input
                type="checkbox"
                name="confirm"
                id="confirm"
                onChange={(e) => {
                  setConfirm(e.target.checked);
                }}
              />
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
