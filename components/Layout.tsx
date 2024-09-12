import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            My App
          </Link>
          <div>
            <Link href="/file-analysis" className="mr-4">
              File Analysis
            </Link>
            {session && (
              <>
                <Link href="/sample-records" className="mr-4">
                  Sample Records
                </Link>
                <Link href="/collect-files" className="mr-4">
                  Collect Files
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/file-analysis" })}
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
