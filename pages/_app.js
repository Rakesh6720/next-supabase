import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // initialize user state to null
  const [user, setUser] = useState(null);

  // callback function to call when auth state changes
  useEffect(() => {
    // adding event listener for auth change
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );
    checkUser();
    return () => {
      // removing event listener for auth change
      authListener?.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }

  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/" passHref>
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
        {user && (
          <Link href="/create-post" passHref>
            <span className="mr-6 cursor-pointer">Create Post</span>
          </Link>
        )}
        <Link href="/profile" passHref>
          <span className="mr-6 cursor-pointer">Profile</span>
        </Link>
      </nav>
      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
