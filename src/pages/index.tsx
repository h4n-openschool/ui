import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Navbar } from "../components/Navbar";

const Home: NextPage = () => {
  const classes = trpc.classes.all.useQuery();

  return (
    <>
      <Head>
        <title>OpenSchool Connect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex flex-col bg-zinc-900 flex-grow">
        <div className="px-6 flex flex-col mx-auto py-6 w-full">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-900 col-span-3 shadow-lg p-4 text-white gap-3">
              Welcome back, <b>John Doe</b>.
            </div>

            <div className="bg-zinc-600 p-4 text-white flex flex-col">
              <span>Classes</span>
              <span className="text-3xl font-bold">
                {classes.isLoading ?
                  '...' :
                  classes.isSuccess ?
                    classes.data.classes.pagination.total :
                    'err'}
              </span>
            </div>

            <div className="bg-zinc-600 p-4 text-white flex flex-col">
              <span>Students</span>
              <span className="text-3xl font-bold">
                {classes.isLoading ?
                  '...' :
                  classes.isSuccess ?
                    classes.data.classes.pagination.total :
                    'err'}
              </span>
            </div>

            <div className="bg-zinc-600 p-4 text-white flex flex-col">
              <span>Unread messages</span>
              <span className="text-3xl font-bold">
                {classes.isLoading ?
                  '...' :
                  classes.isSuccess ?
                    classes.data.classes.pagination.total :
                    'err'}
              </span>
            </div>

            <b className="text-lg font-bold text-white col-span-3">Classes<hr className="border-zinc-600" /></b>
            <div className="col-span-3 bg-zinc-600 text-white">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-zinc-500 py-2 text-left px-3">Name</th>
                    <th className="bg-zinc-500 py-2 text-left px-3">Description</th>
                    <th className="bg-zinc-500 py-2 text-left px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.isLoading ? null : classes.data?.classes.classes.map((v, k) => {
                    const even = k % 2 == 0;

                    const classes = `${even ? 'bg-zinc-700' : ''} py-2 text-left px-3`;

                    return (
                      <tr key={k}>
                        <td className={classes}>{v.displayName}</td>
                        <td className={classes}>{v.description}</td>
                        <td className={classes}>View | Edit | Delete</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <b className="text-lg font-bold text-white col-span-3">Messages<hr className="border-zinc-600" /></b>
            <div className="col-span-3 bg-zinc-600 text-white">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-zinc-500 py-2 text-left px-3">Name</th>
                    <th className="bg-zinc-500 py-2 text-left px-3">Body</th>
                    <th className="bg-zinc-500 py-2 text-left px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 text-left px-3">Jane Doe</td>
                    <td className="py-2 text-left px-3">It&apos;s so great to hear that John Jr. is doing well...</td>
                    <td className="py-2 text-left px-3">View | Dismiss</td>
                  </tr>

                  <tr>
                    <td className="py-2 text-left px-3 bg-zinc-700">Jane Doe</td>
                    <td className="py-2 text-left px-3 bg-zinc-700">It&apos;s so great to hear that John Jr. is doing well...</td>
                    <td className="py-2 text-left px-3 bg-zinc-700">View | Dismiss</td>
                  </tr>

                  <tr>
                    <td className="py-2 text-left px-3">Jane Doe</td>
                    <td className="py-2 text-left px-3">It&apos;s so great to hear that John Jr. is doing well...</td>
                    <td className="py-2 text-left px-3">View | Dismiss</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        type="button"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
