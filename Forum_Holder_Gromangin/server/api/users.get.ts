import db from "~/server/sql";
import url from "url";

export default defineEventHandler(async (event) => {
  const myUrl = url.parse(event.path, true);
  const query = myUrl.query;
  const [rows] = await db.execute(
    query.email ? "SELECT * FROM user WHERE email = ?" : "SELECT * FROM user",
    query.email ? [query.email] : []
  );
  return {
    users: rows,
  };
});
