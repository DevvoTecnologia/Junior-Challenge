import Link from "next/link";

import getSessionServer from "@/lib/getSessionServer";

export default async function LoginPage() {
  const { session } = await getSessionServer();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Welcome to the Rings App
        </h1>
        {!session ? (
          <>
            <p className="mb-6 text-gray-600">
              You are not logged in. Please log in to access the Rings App.
            </p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Log In
            </Link>
          </>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              You are logged in. You can now access the Rings
            </p>
            <Link
              href="/rings"
              className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              See Rings
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
