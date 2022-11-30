import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <></>;
  }

  if (status === "unauthenticated") {
    router.push('/api/auth/signin');
    return <></>;
  }

  return (
    <div className="h-16 bg-zinc-800 flex items-center text-white">
      <div className="flex items-center justify-between px-6 w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline font-bold">Dashboard</Link>
          <Link href="/classes" className="hover:underline font-bold">Classes</Link>
          <Link href="/students" className="hover:underline font-bold">Students</Link>
          <p>Grades</p>
          <p>Messages</p>
        </div>

        <div className="">
          <p>Welcome back, <b>{session?.user?.name}.</b></p>
          <Link href="/api/auth/signout">Log out</Link>
        </div>
      </div>
    </div>
  );
}
