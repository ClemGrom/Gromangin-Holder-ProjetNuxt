import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute("DELETE from message where sujet_id=?", [body.sujet_id]);
  await db.execute("DELETE from sujet where id=?", [body.sujet_id]);
});
