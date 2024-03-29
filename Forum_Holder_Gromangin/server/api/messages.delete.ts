import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute("DELETE from message where id=?", [body.id]);
});
