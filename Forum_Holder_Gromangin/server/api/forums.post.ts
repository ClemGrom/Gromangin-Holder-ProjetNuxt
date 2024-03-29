import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute("INSERT INTO forum (name,created) VALUES (?,?)", [
    body.name,
    new Date(),
  ]);
});
