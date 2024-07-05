import { useClerk, useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import formStyles from "../components/forms/Forms.module.css";
import Link from "next/link";
import Input from "../components/forms/FormInput";
import Checkbox from "../components/forms/FormCheckbox";
import { AppProps } from "next/app";
import Step1Fitness from "../components/onboarding/step1fitness";
import Image from "next/image";
import HomeData from "@/components/charts/home";

const Home = ({ Component, pageProps }: AppProps) => {
  const { openSignIn } = useClerk();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <SignedOut>
          <HomeData></HomeData>
          {/* <div className={styles.grid}>
            <h1 className={styles.title}>
              <a
                className="kaskara-logo"
                href="https://www.kaskaragroup.com"
                target="blank"
              >
                <Image
                  src="/kaskara-logo.png"
                  alt="kaskara"
                  height="100"
                  width="300"
                  priority
                />
              </a>
            </h1>
            <br />
            <p className={styles.description}>Demo App Framework</p>
            <br />
            <br />
            <a onClick={() => openSignIn()} className={styles.signInButton}>
              Sign in
            </a>
          </div> */}
        </SignedOut>
        <SignedIn>
          <div>
            {/* Put some content here... */}
            <HomeData></HomeData>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

const SignedOutCards = () => {
  const { openSignIn, openSignUp } = useClerk();
  return (
    <>
      <a onClick={() => openSignIn()} className={styles.card}>
        <h2>Sign in &rarr;</h2>
        <p>Show the sign in modal</p>
      </a>
      <a onClick={() => openSignUp()} className={styles.card}>
        <h2>Sign up &rarr;</h2>
        <p>Show the sign up modal</p>
      </a>
    </>
  );
};

const InitialScreening = () => {
  const { user } = useUser();

  return (
    <>
      <div className={formStyles.formcontainer}>
        <ul className="flex">
          <li className="flex-1 mr-2">
            <a
              className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              href="#"
            >
              Active Item
            </a>
          </li>
          <li className="flex-1 mr-2">
            <a
              className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
              href="#"
            >
              Nav Item
            </a>
          </li>
          <li className="text-center flex-1">
            <a
              className="block py-2 px-4 text-gray-400 cursor-not-allowed"
              href="#"
            >
              Disabled Item
            </a>
          </li>
        </ul>
        {/* <Step1Fitness note="1. Are you currently dieting?" /> */}
        {/* <a className={styles.staticCard}>
        <h2>Welcome!</h2>
        <p>Signed in as: {user?.primaryEmailAddress!.toString()}</p>
      </a>
      <Link href="/user">
        <div className={styles.card}>
          <h2>Go to User Profile &rarr;</h2>
          <p>Change your password and more</p>
        </div>
      </Link> */}
      </div>
    </>
  );
};

export default Home;
