import db from "~/server/sql";
import url from "url";

export default defineEventHandler(async (event) => {
  const myUrl = url.parse(event.path, true);
  const query = myUrl.query;
  const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [
    query.id,
  ]);
  return {
    forums: rows,
  };
});
