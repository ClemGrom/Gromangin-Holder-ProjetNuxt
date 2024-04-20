import db from "~/server/sql";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute("INSERT INTO user (email,password) VALUES (?,?)", [
    body.email,
    body.password,
  ]);
});
