import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

/**
 * The generateMetadata function is a special function in Next.js that allows you to dynamically generate metadata for a page based on the parameters passed to it. In this case, it takes the mealSlug parameter from the URL and can use it to fetch the meal details and generate appropriate metadata such as the page title, description, and other relevant information. This helps improve SEO and provides a better user experience by displaying relevant information in search engine results and when sharing the page on social media platforms.
 */
export async function generateMetadata({ params }) {
  const { mealSlug } = await params;
  const meal = getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const { mealSlug } = await params;
  const meal = getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  /**
   * The instructions for the meal are stored as plain text with newline characters to indicate line breaks. However, when rendering this text in HTML, the newline characters will not be interpreted as line breaks. To ensure that the instructions are displayed correctly with line breaks, we need to replace the newline characters with HTML line break tags (<br />). This way, when the instructions are rendered in the browser, they will appear with the intended formatting, making it easier for users to read and follow the recipe steps.
   */
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        {/* Dangerously set inner HTML opens you up to XSS attacks if you do not validate the content */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        />
      </main>
    </>
  );
}
