import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export function getMeal(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}

export async function saveMeal(meal) {
  const slug = slugify(meal.title, { lower: true });

  const sanitizedMeal = {
    ...meal,
    title: xss(meal.title),
    summary: xss(meal.summary),
    instructions: xss(meal.instructions),
  };

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}_${Date.now()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  sanitizedMeal.image = `/images/${fileName}`;

  const stmt = db.prepare(
    "INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  stmt.run(
    slug,
    sanitizedMeal.title,
    sanitizedMeal.summary,
    sanitizedMeal.instructions,
    sanitizedMeal.image,
    sanitizedMeal.creator,
    sanitizedMeal.creator_email,
  );
}
