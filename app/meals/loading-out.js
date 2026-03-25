import classes from "./loading.module.css";
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals, please wait...</p>;
}
