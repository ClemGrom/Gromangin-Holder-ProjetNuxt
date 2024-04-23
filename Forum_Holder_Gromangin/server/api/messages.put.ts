import db from "~/server/sql";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body); 
  await db.execute(
    "UPDATE message SET content = ? WHERE id = ?",
    [body.content, body.id]
  );
});
