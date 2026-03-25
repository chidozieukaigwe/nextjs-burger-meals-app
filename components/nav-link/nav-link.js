"use client";
import Link from "next/link";
import classes from "./nav-link.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  /**
   * This is used to trigger a re-render when the pathname changes, which allows the header to update its background image based on the current page.
   */
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
