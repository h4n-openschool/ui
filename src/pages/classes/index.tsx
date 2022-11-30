import { type NextPage } from "next";
import Head from "next/head";

import { trpc } from "../../utils/trpc";
import { Navbar } from "../../components/Navbar";

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
                  {classes.isLoading ? null : classes.data?.classes.map((v, k) => {
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
         </div>
        </div>
      </main>
    </>
  );
};

export default Home;
