import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="h-16 bg-zinc-800 flex items-center text-white">
      <div className="flex items-center justify-between px-6 w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="">Dashboard</Link>
          <p>Classes</p>
          <p>Students</p>
          <p>Grades</p>
          <p>Messages</p>
        </div>

        <div className="">
          <p>Welcome back, <b>{session?.user?.name}.</b></p>
        </div>
      </div>
    </div>
  );
}
