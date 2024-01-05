import styles from "./Header.module.css";
import type { NextPage } from "next";
import { useClerk, SignedIn, useUser, SignedOut, UserButton } from "@clerk/nextjs";
import Navbar from './Navbar/Navbar'; // Import the Navbar component

const Header: NextPage = () => {
  const { openSignIn, user } = useClerk();

  return (
    <SignedIn>
      <header>
        <Navbar />
      </header>
    </SignedIn>
  );
};

export default Header;
