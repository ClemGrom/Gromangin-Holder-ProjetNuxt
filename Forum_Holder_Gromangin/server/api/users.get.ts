import db from "~/server/sql";
import url from "url";

export default defineEventHandler(async (event) => {
  const myUrl = url.parse(event.path, true);
  const query = myUrl.query;
  const [rows] = await db.execute(
    query.id ? "SELECT * FROM user WHERE id = ?" : "SELECT * FROM user",
  );
  return {
    users: rows,
  };
});
