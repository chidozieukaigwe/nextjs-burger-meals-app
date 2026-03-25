import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "@/components/main-header/main-header-background/main-header-background";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image
            src={logoImg}
            /**loading lazy vs eager - what is the difference? The difference between lazy and eager loading is when the image is loaded. Lazy loading defers loading the image until it is about to enter the viewport, which can improve page load performance. Eager loading loads the image immediately, which can be useful for above-the-fold content. */
            loading="eager"
            alt="A plate with food on it"
            width={80}
            height={80}
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
