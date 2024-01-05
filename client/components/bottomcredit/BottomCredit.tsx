import styles from "./BottomCredit.module.css";
import Image from "next/image";

type BottomCreditProps = {
  label: string;
  privacyLink: string;
};
const BottomCredit = (props: BottomCreditProps) => (
  <>
    <section className="bg-white">
    <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2 text-sm">
            <div className="px-5 py-2">
            <a className={styles.logo} href="https://www.kaskaragroup.com" target="blank">
              <Image src="/kaskara-logo-brown.png" alt="kaskara" height="13" width="100" priority />
            </a>
            </div>
            <div className="px-5 py-2 text-gray-600">
              {props.label}
            </div>
            <div className="px-5 py-2 text-orange-300">
                <a href={props.privacyLink}>
                  View our Privacy Statement
                  <span className={styles.rightArrow}>
                    <Image src="/arrow-right.svg" alt="->" width="12" height="12" />
                  </span>
                </a>
            </div>
        </nav>
    </div>
</section>
  </>
);

export default BottomCredit;
