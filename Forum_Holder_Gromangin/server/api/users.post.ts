import db from "~/server/sql";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(
    "INSERT INTO user (name,email,password,isAdmin) VALUES (?,?,?,?)",
    [body.name, body.email, body.password, body.isAdmin]
  );
});
