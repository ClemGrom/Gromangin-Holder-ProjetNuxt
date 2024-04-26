import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(`
  DELETE FROM message
  WHERE sujet_id IN (
    SELECT id FROM sujet WHERE forum_id = ?
  );
`, [body.forum_id]);
});
