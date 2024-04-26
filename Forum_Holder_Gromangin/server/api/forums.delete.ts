import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(`
    DELETE FROM forum WHERE id = ?;
`, [body.forum_id]);
});
