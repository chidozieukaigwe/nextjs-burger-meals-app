import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

// Component to render the meals page
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself, it is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share" className={classes.cta}>
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* /
          Suspense is a component provided by react that allows you to handle asynchronous operations in a declarative way. It is used to wrap components that may have asynchronous data fetching or loading states. The fallback prop is used to specify what should be rendered while the wrapped component is still loading. In this case, it renders a paragraph with a loading message until the Meals component has finished fetching the meals data and is ready to be displayed.
          fallback prop is used to specify what should be rendered while the wrapped component is still loading. In this case, it renders a paragraph with a loading message until the Meals component has finished fetching the meals data and is ready to be displayed.
        */}
        <Suspense
          fallback={
            <p className={classes.loading}>Fetching meals, please wait...</p>
          }
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
