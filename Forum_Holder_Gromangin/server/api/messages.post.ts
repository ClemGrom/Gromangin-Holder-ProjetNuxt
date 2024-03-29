import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(
    "INSERT INTO message (author_id,content,date,sujet_id) VALUES (?,?,?,?)",
    [body.user_id, body.content, new Date(), body.sujet_id]
  );
});
