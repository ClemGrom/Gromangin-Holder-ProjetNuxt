import db from "~/server/sql";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(
    "INSERT INTO sujet (name,created,forum_id,is_open) VALUES (?,?,?,?)",
    [body.name, new Date(), body.forum_id,1]
  );
});
