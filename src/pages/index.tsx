import { type NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import { Navbar } from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();

  const classes = trpc.classes.all.useQuery();
  const students = trpc.students.all.useQuery();

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
              Welcome back, <b>{data?.user?.name}</b>.
            </div>
            <div className="bg-zinc-600 text-white p-6 flex flex-col">
              <b>Classes</b>
              <span className="text-3xl font-bold">{classes.data ? classes.data.pagination.total : '...'}</span>
              <Link href="/classes" className="text-sm">View all</Link>
            </div>

            <div className="bg-zinc-600 text-white p-6 flex flex-col">
              <b>Students</b>
              <span className="text-3xl font-bold">{students.data ? students.data.pagination.total : '...'}</span>
              <Link href="/students" className="text-sm">View all</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
