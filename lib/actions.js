/**
 * Server Action
 * use server directive is used to indicate that the function should be executed on the server side. This is important for handling form submissions securely and efficiently, as it allows the server to process the data without exposing sensitive information to the client. By using this directive, we can ensure that the meal sharing functionality is implemented in a way that adheres to best practices for server-side processing in Next.js applications.
 */

/**
 * when adding the use server directive at the top of the file all functions in that file are treated as server actions, which means they will be executed on the server side when called from the client. This allows us to handle form submissions and other interactions securely and efficiently, as the server can process the data without exposing sensitive information to the client. By using this directive, we can ensure that our meal sharing functionality is implemented in a way that adheres to best practices for server-side processing in Next.js applications.
 */
"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

/**prevState is coming from useActionState hook */
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input. Please fill in all fields correctly.",
    };
  }

  await saveMeal(meal);

  redirect("/meals");
}
