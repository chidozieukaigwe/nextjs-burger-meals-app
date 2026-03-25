"use client";
import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  /**
   * // This hook is used to track the status of the form submission, allowing us to provide feedback to the user about the progress of their meal sharing action. By using this hook, we can enhance the user experience by showing loading indicators or success messages based on the form's submission state, ensuring that users are informed about the outcome of their actions when sharing a meal.
   */
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting ..." : "Share Meal"}
    </button>
  );
}
