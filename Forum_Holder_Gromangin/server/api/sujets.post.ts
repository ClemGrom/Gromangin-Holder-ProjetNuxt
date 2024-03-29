import db from "~/server/sql";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(
    "INSERT INTO sujet (name,created,forum_id) VALUES (?,?,?)",
    [body.name, new Date(), body.forum_id]
  );
});
